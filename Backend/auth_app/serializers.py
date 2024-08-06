
# # from rest_framework import serializers
# # from .models import AuditForm, ComponentWithError, ComponentWithoutError, ErrorCase, FileAttachment

# # class FileAttachmentSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = FileAttachment
# #         fields = ['id', 'file', 'uploaded_at']

# # class ComponentWithErrorSerializer(serializers.ModelSerializer):
# #     files = FileAttachmentSerializer(many=True, required=False)

# #     class Meta:
# #         model = ComponentWithError
# #         fields = [
# #             'id', 'sub_barcode', 'check_status', 'change_status',
# #             'select_category', 'error_definition', 'remarks', 'remarks_for_operations',
# #             'files', 'counter2'
# #         ]

# #     def create(self, validated_data):
# #         files_data = validated_data.pop('files', [])
# #         component = ComponentWithError.objects.create(**validated_data)
# #         for file_data in files_data:
# #             file_attachment = FileAttachment.objects.create(**file_data, component_with_error=component)
# #         return component

# #     def update(self, instance, validated_data):
# #         files_data = validated_data.pop('files', [])
# #         instance.sub_barcode = validated_data.get('sub_barcode', instance.sub_barcode)
# #         instance.check_status = validated_data.get('check_status', instance.check_status)
# #         instance.change_status = validated_data.get('change_status', instance.change_status)
# #         instance.select_category = validated_data.get('select_category', instance.select_category)
# #         instance.error_definition = validated_data.get('error_definition', instance.error_definition)
# #         instance.remarks = validated_data.get('remarks', instance.remarks)
# #         instance.remarks_for_operations = validated_data.get('remarks_for_operations', instance.remarks_for_operations)
# #         instance.counter2 = validated_data.get('counter2', instance.counter2)
# #         instance.save()

# #         # Clear existing files and add new ones
# #         instance.fileattachment_set.all().delete()
# #         for file_data in files_data:
# #             file_attachment = FileAttachment.objects.create(**file_data, component_with_error=instance)

# #         return instance

# # class ComponentWithoutErrorSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = ComponentWithoutError
# #         fields = [
# #             'id', 'sub_barcode', 'check_status', 'change_status',
# #             'remarks', 'remarks_for_operations', 'counter3'
# #         ]

# # class ErrorCaseSerializer(serializers.ModelSerializer):
# #     files = FileAttachmentSerializer(many=True, required=False)

# #     class Meta:
# #         model = ErrorCase
# #         fields = [
# #             'id', 'select_category', 'error_definition', 'final_error_category',
# #             'remarks', 'remarks_for_operations', 'files', 'counter1'
# #         ]

# #     def create(self, validated_data):
# #         files_data = validated_data.pop('files', [])
# #         error_case = ErrorCase.objects.create(**validated_data)
# #         for file_data in files_data:
# #             file_attachment = FileAttachment.objects.create(**file_data, error_case=error_case)
# #         return error_case

# #     def update(self, instance, validated_data):
# #         files_data = validated_data.pop('files', [])
# #         instance.select_category = validated_data.get('select_category', instance.select_category)
# #         instance.error_definition = validated_data.get('error_definition', instance.error_definition)
# #         instance.final_error_category = validated_data.get('final_error_category', instance.final_error_category)
# #         instance.remarks = validated_data.get('remarks', instance.remarks)
# #         instance.remarks_for_operations = validated_data.get('remarks_for_operations', instance.remarks_for_operations)
# #         instance.counter1 = validated_data.get('counter1', instance.counter1)
# #         instance.save()

# #         # Clear existing files and add new ones
# #         instance.fileattachment_set.all().delete()
# #         for file_data in files_data:
# #             file_attachment = FileAttachment.objects.create(**file_data, error_case=instance)

# #         return instance

# # class AuditFormSerializer(serializers.ModelSerializer):
# #     error_cases = ErrorCaseSerializer(many=True, required=False)
# #     componentsWithError = ComponentWithErrorSerializer(many=True, required=False)
# #     componentsWithoutError = ComponentWithoutErrorSerializer(many=True, required=False)

# #     class Meta:
# #         model = AuditForm
# #         fields = [
# #             'id', 'user', 'barcode', 'audit_type', 'case_error', 'case_status',
# #             'status', 'created_at', 'error_cases', 'componentsWithError', 'componentsWithoutError'
# #         ]

# #     def create(self, validated_data):
# #         error_cases_data = validated_data.pop('error_cases', [])
# #         components_with_error_data = validated_data.pop('componentsWithError', [])
# #         components_without_error_data = validated_data.pop('componentsWithoutError', [])

# #         audit_form = AuditForm.objects.create(**validated_data)

# #         for error_case_data in error_cases_data:
# #             files_data = error_case_data.pop('files', [])
# #             error_case = ErrorCase.objects.create(audit_form=audit_form, **error_case_data)
# #             for file_data in files_data:
# #                 FileAttachment.objects.create(**file_data, error_case=error_case)

# #         for component_with_error_data in components_with_error_data:
# #             files_data = component_with_error_data.pop('files', [])
# #             component = ComponentWithError.objects.create(audit_form=audit_form, **component_with_error_data)
# #             for file_data in files_data:
# #                 FileAttachment.objects.create(**file_data, component_with_error=component)

# #         for component_without_error_data in components_without_error_data:
# #             ComponentWithoutError.objects.create(audit_form=audit_form, **component_without_error_data)

# #         return audit_form

# #     def update(self, instance, validated_data):
# #         components_with_error_data = validated_data.pop('componentsWithError', [])
# #         components_without_error_data = validated_data.pop('componentsWithoutError', [])
# #         error_cases_data = validated_data.pop('error_cases', [])

# #         instance.barcode = validated_data.get('barcode', instance.barcode)
# #         instance.audit_type = validated_data.get('audit_type', instance.audit_type)
# #         instance.case_error = validated_data.get('case_error', instance.case_error)
# #         instance.case_status = validated_data.get('case_status', instance.case_status)
# #         instance.status = validated_data.get('status', instance.status)
# #         instance.created_at = validated_data.get('created_at', instance.created_at)
# #         instance.save()

# #         # Remove existing components and errors
# #         # instance.componentsWithError.all().delete()
# #         # instance.componentsWithoutError.all().delete()
# #         # instance.error_cases.all().delete()

# #         # Create new components and errors
# #         for component_data in components_with_error_data:
# #             files_data = component_data.pop('files', [])
# #             component = ComponentWithError.objects.create(audit_form=instance, **component_data)
# #             for file_data in files_data:
# #                 FileAttachment.objects.create(**file_data, component_with_error=component)

# #         for component_data in components_without_error_data:
# #             ComponentWithoutError.objects.create(audit_form=instance, **component_data)

# #         for error_case_data in error_cases_data:
# #             files_data = error_case_data.pop('files', [])
# #             error_case = ErrorCase.objects.create(audit_form=instance, **error_case_data)
# #             for file_data in files_data:
# #                 FileAttachment.objects.create(**file_data, error_case=error_case)

# #         return instance



# # ---------------------------------

# from rest_framework import serializers
# from .models import AuditForm, ComponentWithError, ComponentWithoutError, ErrorCase, FileAttachment

# class FileAttachmentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = FileAttachment
#         fields = ['id', 'file', 'uploaded_at']

# class ComponentWithErrorSerializer(serializers.ModelSerializer):
#     files = serializers.ListField(child=serializers.DictField(), required=False)

#     class Meta:
#         model = ComponentWithError
#         fields = [
#             'id', 'sub_barcode', 'check_status', 'change_status',
#             'select_category', 'error_definition', 'remarks', 'remarks_for_operations',
#             'files', 'counter2'
#         ]

#     def create(self, validated_data):
#         files_data = validated_data.pop('files', [])
#         component = ComponentWithError.objects.create(**validated_data)
#         for file_data in files_data:
#             file = file_data.get('file')
#             if file:
#                 FileAttachment.objects.create(file=file, component_with_error=component)
#         return component

#     def update(self, instance, validated_data):
#         files_data = validated_data.pop('files', [])
#         instance.sub_barcode = validated_data.get('sub_barcode', instance.sub_barcode)
#         instance.check_status = validated_data.get('check_status', instance.check_status)
#         instance.change_status = validated_data.get('change_status', instance.change_status)
#         instance.select_category = validated_data.get('select_category', instance.select_category)
#         instance.error_definition = validated_data.get('error_definition', instance.error_definition)
#         instance.remarks = validated_data.get('remarks', instance.remarks)
#         instance.remarks_for_operations = validated_data.get('remarks_for_operations', instance.remarks_for_operations)
#         instance.counter2 = validated_data.get('counter2', instance.counter2)
#         instance.save()

#         # Clear existing files and add new ones
#         instance.fileattachment_set.all().delete()
#         for file_data in files_data:
#             file = file_data.get('file')
#             if file:
#                 FileAttachment.objects.create(file=file, component_with_error=instance)

#         return instance

# class ComponentWithoutErrorSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ComponentWithoutError
#         fields = [
#             'id', 'sub_barcode', 'check_status', 'change_status',
#             'remarks', 'remarks_for_operations', 'counter3'
#         ]

# class ErrorCaseSerializer(serializers.ModelSerializer):
#     files = serializers.ListField(child=serializers.DictField(), required=False)

#     class Meta:
#         model = ErrorCase
#         fields = [
#             'id', 'select_category', 'error_definition', 'final_error_category',
#             'remarks', 'remarks_for_operations', 'files', 'counter1'
#         ]

#     def create(self, validated_data):
#         files_data = validated_data.pop('files', [])
#         error_case = ErrorCase.objects.create(**validated_data)
#         for file_data in files_data:
#             file = file_data.get('file')
#             if file:
#                 FileAttachment.objects.create(file=file, error_case=error_case)
#         return error_case

#     def update(self, instance, validated_data):
#         files_data = validated_data.pop('files', [])
#         instance.select_category = validated_data.get('select_category', instance.select_category)
#         instance.error_definition = validated_data.get('error_definition', instance.error_definition)
#         instance.final_error_category = validated_data.get('final_error_category', instance.final_error_category)
#         instance.remarks = validated_data.get('remarks', instance.remarks)
#         instance.remarks_for_operations = validated_data.get('remarks_for_operations', instance.remarks_for_operations)
#         instance.counter1 = validated_data.get('counter1', instance.counter1)
#         instance.save()

#         # Clear existing files and add new ones
#         instance.fileattachment_set.all().delete()
#         for file_data in files_data:
#             file = file_data.get('file')
#             if file:
#                 FileAttachment.objects.create(file=file, error_case=instance)

#         return instance

# class AuditFormSerializer(serializers.ModelSerializer):
#     error_cases = ErrorCaseSerializer(many=True, required=False)
#     componentsWithError = ComponentWithErrorSerializer(many=True, required=False)
#     componentsWithoutError = ComponentWithoutErrorSerializer(many=True, required=False)

#     class Meta:
#         model = AuditForm
#         fields = [
#             'id', 'user', 'barcode', 'audit_type', 'case_error', 'case_status',
#             'status', 'created_at', 'error_cases', 'componentsWithError', 'componentsWithoutError'
#         ]

#     def create(self, validated_data):
#         error_cases_data = validated_data.pop('error_cases', [])
#         components_with_error_data = validated_data.pop('componentsWithError', [])
#         components_without_error_data = validated_data.pop('componentsWithoutError', [])

#         audit_form = AuditForm.objects.create(**validated_data)

#         for error_case_data in error_cases_data:
#             files_data = error_case_data.pop('files', [])
#             error_case = ErrorCase.objects.create(audit_form=audit_form, **error_case_data)
#             for file_data in files_data:
#                 file = file_data.get('file')
#                 if file:
#                     FileAttachment.objects.create(file=file, error_case=error_case)

#         for component_with_error_data in components_with_error_data:
#             files_data = component_with_error_data.pop('files', [])
#             component = ComponentWithError.objects.create(audit_form=audit_form, **component_with_error_data)
#             for file_data in files_data:
#                 file = file_data.get('file')
#                 if file:
#                     FileAttachment.objects.create(file=file, component_with_error=component)

#         for component_without_error_data in components_without_error_data:
#             ComponentWithoutError.objects.create(audit_form=audit_form, **component_without_error_data)

#         return audit_form

#     def update(self, instance, validated_data):
#         components_with_error_data = validated_data.pop('componentsWithError', [])
#         components_without_error_data = validated_data.pop('componentsWithoutError', [])
#         error_cases_data = validated_data.pop('error_cases', [])

#         instance.barcode = validated_data.get('barcode', instance.barcode)
#         instance.audit_type = validated_data.get('audit_type', instance.audit_type)
#         instance.case_error = validated_data.get('case_error', instance.case_error)
#         instance.case_status = validated_data.get('case_status', instance.case_status)
#         instance.status = validated_data.get('status', instance.status)
#         instance.created_at = validated_data.get('created_at', instance.created_at)
#         instance.save()

#         # Remove existing components and errors
#         instance.componentsWithError.all().delete()
#         instance.componentsWithoutError.all().delete()
#         instance.error_cases.all().delete()

#         # Create new components and errors
#         for component_data in components_with_error_data:
#             files_data = component_data.pop('files', [])
#             component = ComponentWithError.objects.create(audit_form=instance, **component_data)
#             for file_data in files_data:
#                 file = file_data.get('file')
#                 if file:
#                     FileAttachment.objects.create(file=file, component_with_error=component)

#         for component_data in components_without_error_data:
#             ComponentWithoutError.objects.create(audit_form=instance, **component_data)

#         for error_case_data in error_cases_data:
#             files_data = error_case_data.pop('files', [])
#             error_case = ErrorCase.objects.create(audit_form=instance, **error_case_data)
#             for file_data in files_data:
#                 file = file_data.get('file')
#                 if file:
#                     FileAttachment.objects.create(file=file, error_case=error_case)

#         return instance


from rest_framework import serializers
from django.core.files.base import ContentFile
import base64
import uuid
from .models import AuditForm, ComponentWithError, ComponentWithoutError, ErrorCase, FileAttachment



# Custom Base64FileField to handle base64 encoded files
class Base64FileField(serializers.FileField):
    def to_internal_value(self, data):
        if isinstance(data, str) and data.startswith('data:'):
            # format: data:<mime>;base64,<base64_data>
            format, base64_data = data.split(';base64,')
            ext = format.split('/')[-1]  # guess file extension
            file_name = f"{uuid.uuid4()}.{ext}"
            data = ContentFile(base64.b64decode(base64_data), name=file_name)
        return super().to_internal_value(data)

# Serializers for the models
class ErrorCaseSerializer(serializers.ModelSerializer):
    files = serializers.ListField(
        child=Base64FileField(),
        required=False,
    )

    class Meta:
        model = ErrorCase
        fields = '__all__'

class ComponentWithErrorSerializer(serializers.ModelSerializer):
    files = serializers.ListField(
        child=Base64FileField(),
        required=False,
    )

    class Meta:
        model = ComponentWithError
        fields = [
            'id', 'sub_barcode', 'check_status', 'change_status',
            'select_category', 'error_definition', 'remarks', 'remarks_for_operations',
            'files', 'counter2'
         ]

class ComponentWithoutErrorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComponentWithoutError
        fields = [
            'id', 'sub_barcode', 'check_status', 'change_status',
            'remarks', 'remarks_for_operations', 'counter3'
         ]

class AuditFormSerializer(serializers.ModelSerializer):
    error_cases = ErrorCaseSerializer(many=True)
    componentsWithError = ComponentWithErrorSerializer(many=True)
    componentsWithoutError = ComponentWithoutErrorSerializer(many=True)

    class Meta:
        model = AuditForm
        fields = '__all__'

    def create(self, validated_data):
        error_cases_data = validated_data.pop('error_cases')
        components_with_error_data = validated_data.pop('componentsWithError')
        components_without_error_data = validated_data.pop('componentsWithoutError')

        audit_form = AuditForm.objects.create(**validated_data)

        for error_case_data in error_cases_data:
            ErrorCase.objects.create(audit_form=audit_form, **error_case_data)

        for component_with_error_data in components_with_error_data:
            ComponentWithError.objects.create(audit_form=audit_form, **component_with_error_data)

        for component_without_error_data in components_without_error_data:
            ComponentWithoutError.objects.create(audit_form=audit_form, **component_without_error_data)

        return audit_form

    def update(self, instance, validated_data):
        error_cases_data = validated_data.pop('error_cases')
        components_with_error_data = validated_data.pop('componentsWithError')
        components_without_error_data = validated_data.pop('componentsWithoutError')

        instance.barcode = validated_data.get('barcode', instance.barcode)
        instance.audit_type = validated_data.get('audit_type', instance.audit_type)
        instance.case_error = validated_data.get('case_error', instance.case_error)
        instance.case_status = validated_data.get('case_status', instance.case_status)
        instance.status = validated_data.get('status', instance.status)
        instance.created_at = validated_data.get('created_at', instance.created_at)
        instance.save()

        # Update or create error cases
        for error_case_data in error_cases_data:
            error_case_id = error_case_data.get('id')
            if error_case_id:
                error_case = ErrorCase.objects.get(id=error_case_id, audit_form=instance)
                for attr, value in error_case_data.items():
                    setattr(error_case, attr, value)
                error_case.save()
            else:
                ErrorCase.objects.create(audit_form=instance, **error_case_data)

        # Update or create components with error
        for component_with_error_data in components_with_error_data:
            component_with_error_id = component_with_error_data.get('id')
            if component_with_error_id:
                component_with_error = ComponentWithError.objects.get(id=component_with_error_id, audit_form=instance)
                for attr, value in component_with_error_data.items():
                    setattr(component_with_error, attr, value)
                component_with_error.save()
            else:
                ComponentWithError.objects.create(audit_form=instance, **component_with_error_data)

        # Update or create components without error
        for component_without_error_data in components_without_error_data:
            component_without_error_id = component_without_error_data.get('id')
            if component_without_error_id:
                component_without_error = ComponentWithoutError.objects.get(id=component_without_error_id, audit_form=instance)
                for attr, value in component_without_error_data.items():
                    setattr(component_without_error, attr, value)
                component_without_error.save()
            else:
                ComponentWithoutError.objects.create(audit_form=instance, **component_without_error_data)

        return instance