# Generated by Django 4.1 on 2022-11-17 04:00

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('subscriptions', '0007_alter_subscription_end_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subscription',
            name='end_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 11, 17, 4, 0, 9, 756232, tzinfo=datetime.timezone.utc)),
        ),
    ]
