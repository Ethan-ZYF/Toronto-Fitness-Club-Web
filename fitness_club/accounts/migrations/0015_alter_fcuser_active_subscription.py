# Generated by Django 4.1 on 2022-11-17 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0014_alter_fcuser_active_subscription'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fcuser',
            name='active_subscription',
            field=models.BooleanField(default=False, editable=False),
        ),
    ]
