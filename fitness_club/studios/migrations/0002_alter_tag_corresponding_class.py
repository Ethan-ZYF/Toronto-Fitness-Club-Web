# Generated by Django 4.1 on 2022-12-08 07:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('studios', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tag',
            name='corresponding_class',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tags', to='studios.class'),
        ),
    ]