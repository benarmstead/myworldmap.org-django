# Generated by Django 4.0.6 on 2022-08-07 12:12

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MapData',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('data', models.JSONField(default=dict)),
                ('user', models.CharField(max_length=256)),
            ],
        ),
    ]