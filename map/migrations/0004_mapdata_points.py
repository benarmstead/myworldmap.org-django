# Generated by Django 4.0.4 on 2022-08-12 17:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('map', '0003_merge_0002_alter_mapdata_data_0002_mapdata_public'),
    ]

    operations = [
        migrations.AddField(
            model_name='mapdata',
            name='points',
            field=models.JSONField(default=[]),
        ),
    ]