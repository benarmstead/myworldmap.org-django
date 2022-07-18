import json

from django.db import models


class MapData(models.Model):
    data = models.JSONField(null=False, default=dict)

  #  def __str__(self):

    def getJSON(self):
        data = json.dumps(self.data)

        # print(data)
        return (
            self.data
            # self.data,
        )
