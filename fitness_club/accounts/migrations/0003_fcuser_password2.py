# Generated by Django 4.1 on 2022-11-14 06:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_fcuser_delete_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='fcuser',
            name='password2',
            field=models.CharField(max_length=50, null=True),
        ),
    ]