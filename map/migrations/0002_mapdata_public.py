from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('map', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='mapdata',
            name='public',
            field=models.BooleanField(default=True),
        ),
    ]
