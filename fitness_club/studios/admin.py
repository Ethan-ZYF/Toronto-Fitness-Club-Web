from django.contrib import admin
from .models import Studio, Class, Tag, StudioImage, Amenity


# Register your models here.
class StudioImageInline(admin.TabularInline):
    model = StudioImage

class StudioAmenityInline(admin.TabularInline):
    model = Amenity

class StudioAdmin(admin.ModelAdmin):
    inlines = [StudioImageInline, StudioAmenityInline]


admin.site.register(Studio, StudioAdmin)


class TagInline(admin.TabularInline):
    model = Tag


class ClassAdmin(admin.ModelAdmin):
    inlines = [TagInline]


admin.site.register(Class, ClassAdmin)
