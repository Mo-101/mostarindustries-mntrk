# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class VideoStreamResponseDetectionsSummary(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, detections_count: Object=None, timestamps: Object=None):  # noqa: E501
        """VideoStreamResponseDetectionsSummary - a model defined in Swagger

        :param detections_count: The detections_count of this VideoStreamResponseDetectionsSummary.  # noqa: E501
        :type detections_count: Object
        :param timestamps: The timestamps of this VideoStreamResponseDetectionsSummary.  # noqa: E501
        :type timestamps: Object
        """
        self.swagger_types = {
            'detections_count': Object,
            'timestamps': Object
        }

        self.attribute_map = {
            'detections_count': 'detections_count',
            'timestamps': 'timestamps'
        }
        self._detections_count = detections_count
        self._timestamps = timestamps

    @classmethod
    def from_dict(cls, dikt) -> 'VideoStreamResponseDetectionsSummary':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The VideoStreamResponse_detections_summary of this VideoStreamResponseDetectionsSummary.  # noqa: E501
        :rtype: VideoStreamResponseDetectionsSummary
        """
        return util.deserialize_model(dikt, cls)

    @property
    def detections_count(self) -> Object:
        """Gets the detections_count of this VideoStreamResponseDetectionsSummary.

        Total number of detections.  # noqa: E501

        :return: The detections_count of this VideoStreamResponseDetectionsSummary.
        :rtype: Object
        """
        return self._detections_count

    @detections_count.setter
    def detections_count(self, detections_count: Object):
        """Sets the detections_count of this VideoStreamResponseDetectionsSummary.

        Total number of detections.  # noqa: E501

        :param detections_count: The detections_count of this VideoStreamResponseDetectionsSummary.
        :type detections_count: Object
        """

        self._detections_count = detections_count

    @property
    def timestamps(self) -> Object:
        """Gets the timestamps of this VideoStreamResponseDetectionsSummary.

        Timestamps of detected Mastomys events.  # noqa: E501

        :return: The timestamps of this VideoStreamResponseDetectionsSummary.
        :rtype: Object
        """
        return self._timestamps

    @timestamps.setter
    def timestamps(self, timestamps: Object):
        """Sets the timestamps of this VideoStreamResponseDetectionsSummary.

        Timestamps of detected Mastomys events.  # noqa: E501

        :param timestamps: The timestamps of this VideoStreamResponseDetectionsSummary.
        :type timestamps: Object
        """

        self._timestamps = timestamps
