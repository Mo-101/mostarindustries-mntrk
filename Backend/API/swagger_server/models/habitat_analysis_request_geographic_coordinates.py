# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class HabitatAnalysisRequestGeographicCoordinates(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, latitude: object=None, longitude: object=None):  # noqa: E501
        """HabitatAnalysisRequestGeographicCoordinates - a model defined in Swagger

        :param latitude: The latitude of this HabitatAnalysisRequestGeographicCoordinates.  # noqa: E501
        :type latitude: object
        :param longitude: The longitude of this HabitatAnalysisRequestGeographicCoordinates.  # noqa: E501
        :type longitude: object
        """
        self.swagger_types = {
            'latitude': object,
            'longitude': object
        }

        self.attribute_map = {
            'latitude': 'latitude',
            'longitude': 'longitude'
        }
        self._latitude = latitude
        self._longitude = longitude

    @classmethod
    def from_dict(cls, dikt) -> 'HabitatAnalysisRequestGeographicCoordinates':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The HabitatAnalysisRequest_geographic_coordinates of this HabitatAnalysisRequestGeographicCoordinates.  # noqa: E501
        :rtype: HabitatAnalysisRequestGeographicCoordinates
        """
        return util.deserialize_model(dikt, cls)

    @property
    def latitude(self) -> object:
        """Gets the latitude of this HabitatAnalysisRequestGeographicCoordinates.


        :return: The latitude of this HabitatAnalysisRequestGeographicCoordinates.
        :rtype: object
        """
        return self._latitude

    @latitude.setter
    def latitude(self, latitude: object):
        """Sets the latitude of this HabitatAnalysisRequestGeographicCoordinates.


        :param latitude: The latitude of this HabitatAnalysisRequestGeographicCoordinates.
        :type latitude: object
        """

        self._latitude = latitude

    @property
    def longitude(self) -> object:
        """Gets the longitude of this HabitatAnalysisRequestGeographicCoordinates.


        :return: The longitude of this HabitatAnalysisRequestGeographicCoordinates.
        :rtype: object
        """
        return self._longitude

    @longitude.setter
    def longitude(self, longitude: object):
        """Sets the longitude of this HabitatAnalysisRequestGeographicCoordinates.


        :param longitude: The longitude of this HabitatAnalysisRequestGeographicCoordinates.
        :type longitude: object
        """

        self._longitude = longitude
