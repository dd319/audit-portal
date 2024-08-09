from django.db import models
from django.contrib.auth.models import User

class AuditForm(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE , blank=True, null=True)
    barcode = models.CharField(max_length=100, blank=True, null=True)
    audit_type = models.CharField(max_length=100, blank=True, null=True)
    case_error = models.CharField(max_length=10, choices=[('yes', 'Yes'), ('no', 'No'),('incomplete', 'Incomplete')], blank=True, null=True)
    case_status = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=10, default='draft')
    created_at = models.DateField(default=None, null=True,)

    def __str__(self):
        return f"{self.user.username} - {self.audit_type}"

class FileAttachment(models.Model):
    file = models.FileField(upload_to='attachments/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    component_with_error = models.ForeignKey('ComponentWithError', related_name='files', on_delete=models.CASCADE, null=True, blank=True)
    error_case = models.ForeignKey('ErrorCase', related_name='files', on_delete=models.CASCADE, null=True, blank=True)

class ComponentWithError(models.Model):
    audit_form = models.ForeignKey('AuditForm', related_name='componentsWithError', on_delete=models.CASCADE)
    sub_barcode = models.CharField(max_length=100, blank=True, null=True)
    check_status = models.CharField(max_length=100, blank=True, null=True)
    change_status = models.CharField(max_length=100, blank=True, null=True)
    select_category = models.CharField(max_length=100, blank=True, null=True)
    error_definition = models.CharField(max_length=100, blank=True, null=True)
    remarks = models.TextField(blank=True, null=True)
    remarks_for_operations = models.TextField(blank=True, null=True)
    counter2 = models.IntegerField(default=0)

class ComponentWithoutError(models.Model):
    audit_form = models.ForeignKey('AuditForm', related_name='componentsWithoutError', on_delete=models.CASCADE)
    sub_barcode = models.CharField(max_length=100, blank=True, null=True)
    check_status = models.CharField(max_length=100, blank=True, null=True)
    change_status = models.CharField(max_length=100, blank=True, null=True)
    remarks = models.TextField(blank=True, null=True)
    remarks_for_operations = models.TextField(blank=True, null=True)
    counter3 = models.IntegerField(default=0)

class ErrorCase(models.Model):
    audit_form = models.ForeignKey('AuditForm', related_name='error_cases', on_delete=models.CASCADE)
    select_category = models.CharField(max_length=100, blank=True, null=True)
    error_definition = models.CharField(max_length=100, blank=True, null=True)
    final_error_category = models.CharField(max_length=100, blank=True, null=True)
    remarks = models.TextField(blank=True, null=True)
    remarks_for_operations = models.TextField(blank=True, null=True)
    counter1 = models.IntegerField(default=0)



