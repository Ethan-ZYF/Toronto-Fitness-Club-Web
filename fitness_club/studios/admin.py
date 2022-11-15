from django.contrib import admin
from .models import Studio, Class, Tag, StudioImage

# Register your models here.
admin.site.register(Studio)
admin.site.register(Class)
admin.site.register(Tag)
admin.site.register(StudioImage)
