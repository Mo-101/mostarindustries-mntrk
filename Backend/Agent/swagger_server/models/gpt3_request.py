# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict, Any  # Updated to include Any

from swagger_server.models.base_model_ import Model
from swagger_server import util


class GPT3Request(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, prompt: object=None):  # noqa: E501
        """GPT3Request - a model defined in Swagger

        :param prompt: The prompt of this GPT3Request.  # noqa: E501
        :type prompt: object
        """
        self.swagger_types = {
            'prompt': object
        }

        self.attribute_map = {
            'prompt': 'prompt'
        }
        self._prompt = prompt

    @classmethod
    def from_dict(cls, dikt) -> 'GPT3Request':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The GPT3Request of this GPT3Request.  # noqa: E501
        :rtype: GPT3Request
        """
        return util.deserialize_model(dikt, cls)

    @property
    def prompt(self) -> object:
        """Gets the prompt of this GPT3Request.

        The input prompt for GPT.  # noqa: E501

        :return: The prompt of this GPT3Request.
        :rtype: object
        """
        return self._prompt

    @prompt.setter
    def prompt(self, prompt: object):
        """Sets the prompt of this GPT3Request.

        The input prompt for GPT.  # noqa: E501

        :param prompt: The prompt of this GPT3Request.
        :type prompt: object
        """
        if prompt is None:
            raise ValueError("Invalid value for `prompt`, must not be `None`")  # noqa: E501

        self._prompt = prompt

    def to_dict(self) -> Dict[str, Any]:
        """Converts the model instance to a dictionary.

        :return: A dictionary representation of the model.
        :rtype: Dict[str, Any]
        """
        return {
            'prompt': self._prompt
        }
