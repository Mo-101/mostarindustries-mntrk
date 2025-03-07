# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class RAGQueryResponse(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, answer: object=None, sources: object=None):  # noqa: E501
        """RAGQueryResponse - a model defined in Swagger

        :param answer: The answer of this RAGQueryResponse.  # noqa: E501
        :type answer: object
        :param sources: The sources of this RAGQueryResponse.  # noqa: E501
        :type sources: object
        """
        self.swagger_types = {
            'answer': object,
            'sources': object
        }

        self.attribute_map = {
            'answer': 'answer',
            'sources': 'sources'
        }
        self._answer = answer
        self._sources = sources

    @classmethod
    def from_dict(cls, dikt) -> 'RAGQueryResponse':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The RAGQueryResponse of this RAGQueryResponse.  # noqa: E501
        :rtype: RAGQueryResponse
        """
        return util.deserialize_model(dikt, cls)

    @property
    def answer(self) -> object:
        """Gets the answer of this RAGQueryResponse.

        The AI-generated answer to the user query.  # noqa: E501

        :return: The answer of this RAGQueryResponse.
        :rtype: object
        """
        return self._answer

    @answer.setter
    def answer(self, answer: object):
        """Sets the answer of this RAGQueryResponse.

        The AI-generated answer to the user query.  # noqa: E501

        :param answer: The answer of this RAGQueryResponse.
        :type answer: object
        """

        self._answer = answer

    @property
    def sources(self) -> object:
        """Gets the sources of this RAGQueryResponse.

        References or URLs used for answering the query.  # noqa: E501

        :return: The sources of this RAGQueryResponse.
        :rtype: object
        """
        return self._sources

    @sources.setter
    def sources(self, sources: object):
        """Sets the sources of this RAGQueryResponse.

        References or URLs used for answering the query.  # noqa: E501

        :param sources: The sources of this RAGQueryResponse.
        :type sources: object
        """

        self._sources = sources
