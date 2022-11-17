# Generated by Django 4.1 on 2022-11-16 23:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("subscriptions", "0006_alter_subscription_end_date"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="plan",
            name="gym",
        ),
        migrations.RemoveField(
            model_name="plan",
            name="name",
        ),
        migrations.RemoveField(
            model_name="subscription",
            name="end_date",
        ),
        migrations.RemoveField(
            model_name="subscription",
            name="member",
        ),
        migrations.RemoveField(
            model_name="subscription",
            name="start_date",
        ),
        migrations.AddField(
            model_name="subscription",
            name="user",
            field=models.OneToOneField(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="subscription",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="plan",
            name="plan",
            field=models.CharField(
                blank=True,
                choices=[("MONTHLY", "Monthly"), ("YEARLY", "Yearly")],
                max_length=50,
                null=True,
            ),
        ),
    ]