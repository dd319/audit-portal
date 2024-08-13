from django.shortcuts import render
import json
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from google.oauth2 import id_token
from google.auth.transport import requests
from django.contrib.auth.models import User
from .models import AuditForm, ComponentWithError, ComponentWithoutError, ErrorCase
from .serializers import AuditFormSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import NotFound



# class CustomPagination(PageNumberPagination):
#     page_size = 5
#     page_size_query_param = 'page_size'
#     max_page_size = 100

class GoogleLoginView(APIView):
    def post(self, request):
        token = request.data.get('token')
        try:
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), settings.GOOGLE_CLIENT_ID)
            if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise ValueError('Wrong issuer.')

            user_id = idinfo['sub']
            email = idinfo.get('email')
            name = idinfo.get('name')

            # Explicitly create or update user
            user, created = User.objects.get_or_create(username=user_id)
            user.email = email
            user.first_name = name
            user.save()

            # Generate refresh token for the user
            refresh = RefreshToken.for_user(user)

            return Response({
                'accessToken': str(refresh.access_token),
                'refreshToken': str(refresh),
            }, status=status.HTTP_200_OK)

        except ValueError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

class RefreshTokenView(TokenRefreshView):
    pass


class SubmitAuditView(APIView):
    permission_classes = []

    def post(self, request):
        print("Incoming Request Data: ", request.data)

        if request.FILES:
            print("Files saved successfully")
        else:
            print("No files in the request")

        # Copy data and add user ID
        data = request.data.copy()
        data['user'] = request.user.id

        # Pass both data and files to the serializer
        serializer = AuditFormSerializer(data=data, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        print("Serializer Errors: ", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SaveDraftAuditView(generics.ListAPIView):
    permission_classes = []
    # pagination_class = CustomPagination  # Use custom pagination class
    serializer_class = AuditFormSerializer

    def get_queryset(self):
        return AuditForm.objects.filter(user=self.request.user, status='draft').order_by('-id')

class UserAuditsView(generics.ListAPIView):
    serializer_class = AuditFormSerializer
    permission_classes = []
    # pagination_class = CustomPagination  # Use custom pagination class
    
    def get_queryset(self):
        return AuditForm.objects.filter(user=self.request.user, status='submitted').order_by('-id')

class DraftUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = AuditFormSerializer
    permission_classes = []

    def get_queryset(self):
        # Ensure that users can only edit their own drafts
        return AuditForm.objects.filter(user=self.request.user, status='draft')

# class AllAuditsView(generics.ListAPIView):
#     queryset = AuditForm.objects.filter(status='submitted').order_by('-id')
#     serializer_class = AuditFormSerializer
#     permission_classes = [IsAdminUser]

#     def get_queryset(self):
#         queryset = AuditForm.objects.filter(status='submitted').order_by('-id')
#         # Add additional filtering if needed
#         return queryset


class AllAuditsView(generics.ListAPIView):
    queryset = AuditForm.objects.filter(status='submitted').order_by('-id')
    serializer_class = AuditFormSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return AuditForm.objects.filter(status='submitted').order_by('-id')

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        for audit in response.data:
            user_id = audit.get('user')  # Assuming 'user' field stores the user ID
            user = User.objects.get(id=user_id)
            audit['user_name'] = user.username
            audit['user_email'] = user.email
        return response

class DeleteDraftAuditView(generics.DestroyAPIView):
    permission_classes = []

    def get_queryset(self):
        return AuditForm.objects.filter(user=self.request.user, status='draft')

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"detail": "Draft deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    

# class AdminEditSubmittedAuditView(generics.RetrieveUpdateAPIView):
#     queryset = AuditForm.objects.filter(status='submitted')
#     serializer_class = AuditFormSerializer
#     permission_classes = [IsAdminUser]

#     def get_queryset(self):
#         # Additional filtering can be added if needed
#         return AuditForm.objects.filter(status='submitted')

class AdminEditSubmittedAuditView(generics.RetrieveUpdateAPIView):
    queryset = AuditForm.objects.filter(status='submitted')
    serializer_class = AuditFormSerializer
    permission_classes = [IsAdminUser]

    def perform_update(self, serializer):
        # Perform the update
        instance = serializer.save()
        
        # Get the admin user from the request
        admin_user = self.request.user

        # Optionally, you can add this information to the instance or create a log
        # For simplicity, just printing or logging here
        print(f"Admin {admin_user.username} ({admin_user.email}) updated the form with id {instance.pk}")

    def patch(self, request, *args, **kwargs):
        response = super().patch(request, *args, **kwargs)

        # Add admin details to the response
        admin_user = request.user
        response.data['admin'] = {
            'username': admin_user.username,
            'email': admin_user.email
        }

        return response



# Delete Submitted Audit Form (Admin only)
class AdminDeleteSubmittedAuditView(generics.DestroyAPIView):
    queryset = AuditForm.objects.filter(status='submitted')
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return AuditForm.objects.filter(status='submitted')

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"detail": "Submitted form deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


