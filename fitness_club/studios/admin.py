from django.contrib import admin
from .models import Studio, Class, Tag, StudioImage


# Register your models here.
class StudioImageInline(admin.TabularInline):
    model = StudioImage


class StudioAdmin(admin.ModelAdmin):
    inlines = [StudioImageInline]


admin.site.register(Studio, StudioAdmin)


class TagInline(admin.TabularInline):
    model = Tag


class ClassAdmin(admin.ModelAdmin):
    inlines = [TagInline]


admin.site.register(Class, ClassAdmin)
