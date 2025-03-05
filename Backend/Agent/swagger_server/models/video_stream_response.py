# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server.models.video_stream_response_detections_summary import VideoStreamResponseDetectionsSummary  # noqa: F401,E501
from swagger_server import util


class VideoStreamResponse(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, processed_video_url: object=None, detections_summary: VideoStreamResponseDetectionsSummary=None):  # noqa: E501
        """VideoStreamResponse - a model defined in Swagger

        :param processed_video_url: The processed_video_url of this VideoStreamResponse.  # noqa: E501
        :type processed_video_url: object
        :param detections_summary: The detections_summary of this VideoStreamResponse.  # noqa: E501
        :type detections_summary: VideoStreamResponseDetectionsSummary
        """
        self.swagger_types = {
            'processed_video_url': object,
            'detections_summary': VideoStreamResponseDetectionsSummary
        }

        self.attribute_map = {
            'processed_video_url': 'processed_video_url',
            'detections_summary': 'detections_summary'
        }
        self._processed_video_url = processed_video_url
        self._detections_summary = detections_summary

    @classmethod
    def from_dict(cls, dikt) -> 'VideoStreamResponse':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The VideoStreamResponse of this VideoStreamResponse.  # noqa: E501
        :rtype: VideoStreamResponse
        """
        return util.deserialize_model(dikt, cls)

    @property
    def processed_video_url(self) -> object:
        """Gets the processed_video_url of this VideoStreamResponse.

        URL to the processed video.  # noqa: E501

        :return: The processed_video_url of this VideoStreamResponse.
        :rtype: object
        """
        return self._processed_video_url

    @processed_video_url.setter
    def processed_video_url(self, processed_video_url: object):
        """Sets the processed_video_url of this VideoStreamResponse.

        URL to the processed video.  # noqa: E501

        :param processed_video_url: The processed_video_url of this VideoStreamResponse.
        :type processed_video_url: object
        """

        self._processed_video_url = processed_video_url

    @property
    def detections_summary(self) -> VideoStreamResponseDetectionsSummary:
        """Gets the detections_summary of this VideoStreamResponse.


        :return: The detections_summary of this VideoStreamResponse.
        :rtype: VideoStreamResponseDetectionsSummary
        """
        return self._detections_summary

    @detections_summary.setter
    def detections_summary(self, detections_summary: VideoStreamResponseDetectionsSummary):
        """Sets the detections_summary of this VideoStreamResponse.


        :param detections_summary: The detections_summary of this VideoStreamResponse.
        :type detections_summary: VideoStreamResponseDetectionsSummary
        """

        self._detections_summary = detections_summary
