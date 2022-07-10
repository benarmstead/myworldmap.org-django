from django.db import models


class MapData(models.Model):
    data = models.TextField(null=False, default="[]")

    def __str__(self):
        return (
            str(self.data),
        )
