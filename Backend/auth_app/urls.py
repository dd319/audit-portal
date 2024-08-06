from django.conf import settings
from django.urls import path
from .views import AllAuditsView, DeleteDraftAuditView, GoogleLoginView, RefreshTokenView, SaveDraftAuditView, SubmitAuditView, DraftUpdateView, UserAuditsView
from django.conf.urls.static import static

urlpatterns = [
    path('google/', GoogleLoginView.as_view(), name='google-login'),
    path('refresh/', RefreshTokenView.as_view(), name='token_refresh'),
    #path('audit/', save_audit, name='save_audit'),
    path('audit/', SubmitAuditView.as_view(), name='save_audit'),
    path('audit/save-draft/', SaveDraftAuditView.as_view(), name='save-draft-audit'),
    path('audit/update-audit/<int:pk>/', DraftUpdateView.as_view(), name='update_audit'),
    path('audit/delete-draft/<int:pk>/', DeleteDraftAuditView.as_view(), name='delete_draft_audit'),
    path('user-audits/', UserAuditsView.as_view(), name='user_audits'),
    path('all-audits/', AllAuditsView.as_view(), name='all_audits'),
]

