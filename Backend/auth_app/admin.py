

# from django.contrib import admin
# from .models import AuditForm, ComponentWithError, ComponentWithoutError, ErrorCase

# class ComponentWithErrorInline(admin.TabularInline):
#     model = ComponentWithError
#     extra = 1

# class ComponentWithoutErrorInline(admin.TabularInline):
#     model = ComponentWithoutError
#     extra = 1

# class ErrorCaseInline(admin.TabularInline):
#     model = ErrorCase
#     extra = 1

# @admin.register(AuditForm)
# class AuditFormAdmin(admin.ModelAdmin):
#     list_display = ('user', 'inp', 'audit', 'caseError', 'caseStatus', 'status')
#     list_filter = ('caseError', 'caseStatus', 'status')
#     search_fields = ('inp', 'audit')

#     def submitted_by(self, obj):
#         return obj.user.email

#     submitted_by.short_description = 'Submitted By'

#     inlines = [ComponentWithErrorInline, ComponentWithoutErrorInline, ErrorCaseInline]

# @admin.register(ComponentWithError)
# class ComponentWithErrorAdmin(admin.ModelAdmin):
#     list_display = ('inp', 'audit', 'caseError', 'caseStatus', 'remarks', 'remarks_for_operations', 'audit_form')

# @admin.register(ComponentWithoutError)
# class ComponentWithoutErrorAdmin(admin.ModelAdmin):
#     list_display = ('inp', 'audit', 'caseStatus', 'remarks', 'remarks_for_operations', 'audit_form')

# @admin.register(ErrorCase)
# class ErrorCaseAdmin(admin.ModelAdmin):
#     list_display = ('audit', 'error_Definition', 'final_error_category', 'remarks', 'remarks_for_operations', 'audit_form')
#==============================================================================================================================

# from django.contrib import admin
# from .models import AuditForm, ComponentWithError, ComponentWithoutError, ErrorCase

# class ComponentWithErrorInline(admin.TabularInline):
#     model = ComponentWithError
#     extra = 1

# class ComponentWithoutErrorInline(admin.TabularInline):
#     model = ComponentWithoutError
#     extra = 1

# class ErrorCaseInline(admin.TabularInline):
#     model = ErrorCase
#     extra = 1

# @admin.register(AuditForm)
# class AuditFormAdmin(admin.ModelAdmin):
#     list_display = ('user', 'barcode', 'audit_type', 'case_error', 'case_status', 'status', 'created_at')
#     list_filter = ('case_error', 'case_status', 'status', 'created_at')
#     search_fields = ('barcode', 'audit_type')

#     def submitted_by(self, obj):
#         return obj.user.email

#     submitted_by.short_description = 'Submitted By'

#     inlines = [ComponentWithErrorInline, ComponentWithoutErrorInline, ErrorCaseInline]

# @admin.register(ComponentWithError)
# class ComponentWithErrorAdmin(admin.ModelAdmin):
#     list_display = ('sub_barcode', 'audit_type', 'select_category', 'error_definition', 'check_status', 'change_status', 'remarks', 'remarks_for_operations', 'audit_form')

# @admin.register(ComponentWithoutError)
# class ComponentWithoutErrorAdmin(admin.ModelAdmin):
#     list_display = ('sub_barcode', 'check_status', 'change_status', 'remarks', 'remarks_for_operations', 'audit_form')

# @admin.register(ErrorCase)
# class ErrorCaseAdmin(admin.ModelAdmin):
#     list_display = ('select_category', 'error_definition', 'final_error_category', 'remarks', 'remarks_for_operations', 'audit_form')
#==============================================================================================================================

from django.contrib import admin
from .models import AuditForm, ComponentWithError, ComponentWithoutError, ErrorCase, FileAttachment

class FileAttachmentInline(admin.TabularInline):
    model = FileAttachment
    extra = 1

class ComponentWithErrorInline(admin.TabularInline):
    model = ComponentWithError
    extra = 1

class ComponentWithoutErrorInline(admin.TabularInline):
    model = ComponentWithoutError
    extra = 1

class ErrorCaseInline(admin.TabularInline):
    model = ErrorCase
    extra = 1

@admin.register(AuditForm)
class AuditFormAdmin(admin.ModelAdmin):
    list_display = ('user', 'barcode', 'audit_type', 'case_error', 'case_status', 'status', 'created_at','submitted_by')
    list_filter = ('case_error', 'case_status', 'status', 'created_at')
    search_fields = ('barcode', 'audit_type')

    def submitted_by(self, obj):
        return obj.user.email

    submitted_by.short_description = 'Submitted By'

    inlines = [ComponentWithErrorInline, ComponentWithoutErrorInline, ErrorCaseInline]

@admin.register(ComponentWithError)
class ComponentWithErrorAdmin(admin.ModelAdmin):
    list_display = ('sub_barcode', 'select_category', 'error_definition', 'check_status', 'change_status', 'remarks', 'remarks_for_operations', 'audit_form')
    inlines = [FileAttachmentInline]

@admin.register(ComponentWithoutError)
class ComponentWithoutErrorAdmin(admin.ModelAdmin):
    list_display = ('sub_barcode', 'check_status', 'change_status', 'remarks', 'remarks_for_operations', 'audit_form')

@admin.register(ErrorCase)
class ErrorCaseAdmin(admin.ModelAdmin):
    list_display = ('select_category', 'error_definition', 'final_error_category', 'remarks', 'remarks_for_operations', 'audit_form')
    inlines = [FileAttachmentInline]

@admin.register(FileAttachment)
class FileAttachmentAdmin(admin.ModelAdmin):
    list_display = ('file', 'uploaded_at')
