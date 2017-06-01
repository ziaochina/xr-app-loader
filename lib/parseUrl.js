'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = parseURL;
function parseURL(url) {
	var segments = url.split('?');
	var path = segments[0],
	    query = segments[1] || '';
	var params = parseQuery(query);

	return {
		source: url,
		path: path,
		query: query,
		params: params
	};
}

function parseQuery(query) {
	var ret = {},
	    seg = query.replace(/^\?/, '').split('&'),
	    len = seg.length,
	    i = 0,
	    s = void 0;
	for (; i < len; i++) {
		if (!seg[i]) {
			continue;
		}
		s = seg[i].split('=');
		ret[s[0]] = decodeURIComponent(s[1]);
	}
	return ret;
}
module.exports = exports['default'];