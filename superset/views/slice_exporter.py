# https://gist.github.com/JosephRedfern/b35fe314c2209f9d30866b57db607828
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals

from flask import Flask, request, Response, abort, send_from_directory
from selenium import webdriver

from superset import app, db, db_engine_specs, sm, utils

config = app.config

@app.route('/export_slice/', methods=['GET'])
def export(blah):
	pass