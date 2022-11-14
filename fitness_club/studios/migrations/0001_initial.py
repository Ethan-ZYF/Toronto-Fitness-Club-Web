# Generated by Django 4.1 on 2022-11-14 21:06

from django.db import migrations, models
import location_field.models.plain


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Studio",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=50)),
                ("address", models.CharField(max_length=50)),
                (
                    "location",
                    location_field.models.plain.PlainLocationField(max_length=63),
                ),
            ],
        ),
    ]
