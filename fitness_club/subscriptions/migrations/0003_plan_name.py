# Generated by Django 4.1 on 2022-11-16 04:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('subscriptions', '0002_subscription_start_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='plan',
            name='name',
            field=models.CharField(default='Plan', max_length=50),
        ),
    ]
