# Generated by Django 4.1 on 2022-11-16 23:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_fcuser_credit_debit_no'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fcuser',
            name='credit_debit_no',
            field=models.CharField(default=False, max_length=50),
            preserve_default=False,
        ),
    ]
