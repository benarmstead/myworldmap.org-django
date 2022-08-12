import json
import uuid

from django.db import models


class MapData(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    data = models.JSONField(null=False, default=dict)
    points = models.JSONField(null=False, default=[])
    user = models.CharField(null=False, max_length=256)
    public = models.BooleanField(default=True)

    def __str__(self):
        return self.id
