# Generated by Django 4.1 on 2022-11-16 07:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_fcuser_phone_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='fcuser',
            name='credit_debit_no',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]