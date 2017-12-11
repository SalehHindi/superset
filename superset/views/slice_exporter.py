https://gist.github.com/JosephRedfern/b35fe314c2209f9d30866b57db607828

from flask import Flask, request, Response, abort, send_from_directory
from selenium import webdriver

@app.route('/export_slice', methods=['GET'])
def export():
	pass