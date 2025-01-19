# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class ExplainRequest(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, prediction_id: Object=None):  # noqa: E501
        """ExplainRequest - a model defined in Swagger

        :param prediction_id: The prediction_id of this ExplainRequest.  # noqa: E501
        :type prediction_id: Object
        """
        self.swagger_types = {
            'prediction_id': Object
        }

        self.attribute_map = {
            'prediction_id': 'prediction_id'
        }
        self._prediction_id = prediction_id

    @classmethod
    def from_dict(cls, dikt) -> 'ExplainRequest':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The ExplainRequest of this ExplainRequest.  # noqa: E501
        :rtype: ExplainRequest
        """
        return util.deserialize_model(dikt, cls)

    @property
    def prediction_id(self) -> Object:
        """Gets the prediction_id of this ExplainRequest.

        Unique identifier for the prediction to explain.  # noqa: E501

        :return: The prediction_id of this ExplainRequest.
        :rtype: Object
        """
        return self._prediction_id

    @prediction_id.setter
    def prediction_id(self, prediction_id: Object):
        """Sets the prediction_id of this ExplainRequest.

        Unique identifier for the prediction to explain.  # noqa: E501

        :param prediction_id: The prediction_id of this ExplainRequest.
        :type prediction_id: Object
        """

        self._prediction_id = prediction_id
