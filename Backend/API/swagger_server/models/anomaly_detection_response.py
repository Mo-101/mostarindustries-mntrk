# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class AnomalyDetectionResponse(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, message: Object=None, anomaly_results_url: Object=None):  # noqa: E501
        """AnomalyDetectionResponse - a model defined in Swagger

        :param message: The message of this AnomalyDetectionResponse.  # noqa: E501
        :type message: Object
        :param anomaly_results_url: The anomaly_results_url of this AnomalyDetectionResponse.  # noqa: E501
        :type anomaly_results_url: Object
        """
        self.swagger_types = {
            'message': Object,
            'anomaly_results_url': Object
        }

        self.attribute_map = {
            'message': 'message',
            'anomaly_results_url': 'anomaly_results_url'
        }
        self._message = message
        self._anomaly_results_url = anomaly_results_url

    @classmethod
    def from_dict(cls, dikt) -> 'AnomalyDetectionResponse':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The AnomalyDetectionResponse of this AnomalyDetectionResponse.  # noqa: E501
        :rtype: AnomalyDetectionResponse
        """
        return util.deserialize_model(dikt, cls)

    @property
    def message(self) -> Object:
        """Gets the message of this AnomalyDetectionResponse.


        :return: The message of this AnomalyDetectionResponse.
        :rtype: Object
        """
        return self._message

    @message.setter
    def message(self, message: Object):
        """Sets the message of this AnomalyDetectionResponse.


        :param message: The message of this AnomalyDetectionResponse.
        :type message: Object
        """

        self._message = message

    @property
    def anomaly_results_url(self) -> Object:
        """Gets the anomaly_results_url of this AnomalyDetectionResponse.


        :return: The anomaly_results_url of this AnomalyDetectionResponse.
        :rtype: Object
        """
        return self._anomaly_results_url

    @anomaly_results_url.setter
    def anomaly_results_url(self, anomaly_results_url: Object):
        """Sets the anomaly_results_url of this AnomalyDetectionResponse.


        :param anomaly_results_url: The anomaly_results_url of this AnomalyDetectionResponse.
        :type anomaly_results_url: Object
        """

        self._anomaly_results_url = anomaly_results_url
