# from django.shortcuts import render
# import json
# from rest_framework_simplejwt.tokens import RefreshToken # type: ignore
# from rest_framework_simplejwt.views import TokenRefreshView # type: ignore
# from django.conf import settings
# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from google.oauth2 import id_token # type: ignore
# from google.auth.transport import requests # type: ignore
# from django.contrib.auth.models import User
# from .models import Audit
# from .serializers import AuditSerializer
# from rest_framework.permissions import IsAuthenticated, IsAdminUser
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework import generics

# class GoogleLoginView(APIView):
#     def post(self, request):
#         token = request.data.get('token')
#         try:
#             idinfo = id_token.verify_oauth2_token(token, requests.Request(), settings.GOOGLE_CLIENT_ID)
#             if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
#                 raise ValueError('Wrong issuer.')

#             user_id = idinfo['sub']
#             email = idinfo.get('email')
#             name = idinfo.get('name')
#             print(idinfo)

#             # Explicitly create or update user
#             user, created = User.objects.get_or_create(username=user_id)
#             user.email = email
#             user.first_name = name
#             user.save()

#             # Generate refresh token for the user
#             refresh = RefreshToken.for_user(user)

#             return Response({
#                 'accessToken': str(refresh.access_token),
#                 'refreshToken': str(refresh),
#             }, status=status.HTTP_200_OK)

#         except ValueError:
#             return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

# class RefreshTokenView(TokenRefreshView):
#     pass


# class SubmitAuditView(APIView):
#     permission_classes = []

#     def post(self, request):
#         data = request.data.copy()
#         data['user'] = request.user.id
        
#         serializer = AuditSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
# class SaveDraftAuditView(APIView):
#     permission_classes = []

#     def post(self, request):
#         data = request.data.copy()
#         data['user'] = request.user.id
#         data['status'] = 'draft'
#         files = request.FILES.getlist('files')
        
#         serializer = AuditSerializer(data=data)
#         if serializer.is_valid():
#             audit_instance = serializer.save()
#             for file in files:
#                 audit_instance.files.save(file.name, file)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class UserAuditsView(generics.ListAPIView):
#     serializer_class = AuditSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return Audit.objects.filter(user=self.request.user)
    
# class UpdateAuditView(generics.UpdateAPIView):
#     queryset = Audit.objects.all()
#     serializer_class = AuditSerializer
#     permission_classes = [IsAuthenticated]
#     lookup_field = 'pk'

# class AllAuditsView(generics.ListAPIView):
#     queryset = Audit.objects.filter(status='submitted')
#     serializer_class = AuditSerializer
#     permission_classes = [IsAdminUser]

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


# class SubmitAuditView(APIView):
#     permission_classes = []

#     def post(self, request):
#         print("Incoming Request Data: ", request.data)
#         data = request.data.copy()
#         print(data)
#         data['user'] = request.user.id
        
#         serializer = AuditFormSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         print("Serializer Errors: ", serializer.errors)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class SubmitAuditView(APIView):
#     permission_classes = []

#     # def post(self, request):
#     #     formData=request.data
#     #     files=formData["componentsWithError"][0]["files"]
#     #     print(files)


#     #     if True:
#     #         print("Files saved successfully")
#     #     else:
#     #         print("No files in the request")

#     #     # Copy data and add user ID
#     #     data = request.data.copy()
#     #     data['user'] = request.user.id

#     #     # Pass both data and files to the serializer
#     #     serializer = AuditFormSerializer(data=data, context={'request': request})

#     #     if serializer.is_valid():
#     #         serializer.save()
#     #         print(serializer.data)
#     #         return Response(serializer.data, status=status.HTTP_201_CREATED)
        
#     #     print("Serializer Errors: ", serializer.errors)
#     #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     def post(self, request):
#         formData = request.data
#         print("Received FormData: ", formData)

#         # Extract files for debugging
#         try:
#             components_with_error = formData.get("componentsWithError", [])
#             if components_with_error[0].get("files", []):
#                 files = components_with_error[0].get("files", [])
#                 print("Files: ", files)
#             else:
#                 print("No componentsWithError in the data")
#         except Exception as e:
#             print("Error extracting files: ", e)

#         # Copy data and add user ID
#         data = request.data.copy()
#         data['user'] = request.user.id

#         # Pass both data and files to the serializer
#         serializer = AuditFormSerializer(data=data, context={'request': request})

#         if serializer.is_valid():
#             serializer.save()
#             print("Serializer Data: ", serializer.data)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
        
#         print("Serializer Errors: ", serializer.errors)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SaveDraftAuditView(generics.ListAPIView):
    permission_classes = []
    # pagination_class = CustomPagination  # Use custom pagination class
    serializer_class = AuditFormSerializer

    def get_queryset(self):
        return AuditForm.objects.filter(user=self.request.user, status='draft')

class SubmitAuditView(APIView):
    permission_classes = []  # Add necessary permissions

    def post(self, request):
        # Print incoming data for debugging
        print("Incoming Request Data: ", request.data)

        # Copy data and add user ID
        data = request.data.copy()
        data['user'] = request.user.id  # Ensure that request.user.id exists and is valid

        # Pass both data and files to the serializer
        serializer = AuditFormSerializer(data=data, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            print("Serializer Data: ", serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        print("Serializer Errors: ", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserAuditsView(generics.ListAPIView):
    serializer_class = AuditFormSerializer
    permission_classes = []
    # pagination_class = CustomPagination  # Use custom pagination class
    
    def get_queryset(self):
        return AuditForm.objects.filter(user=self.request.user, status='submitted')

class DraftUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = AuditFormSerializer
    permission_classes = []

    def get_queryset(self):
        # Ensure that users can only edit their own drafts
        return AuditForm.objects.filter(user=self.request.user, status='draft')

class AllAuditsView(generics.ListAPIView):
    queryset = AuditForm.objects.filter(status='submitted')
    serializer_class = AuditFormSerializer
    permission_classes = [IsAdminUser]

class DeleteDraftAuditView(generics.DestroyAPIView):
    permission_classes = []

    def get_queryset(self):
        return AuditForm.objects.filter(user=self.request.user, status='draft')

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"detail": "Draft deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


