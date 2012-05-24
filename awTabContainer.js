//
// awTabContainer.js (AttoWidget TabContainer : convert a raw list of DOM nodes into a simple, self-contained tab widget)
//
// author: Ryan Corradini
// version: 1.1
// date: 23 May 2012
// license: MIT
//

"use strict";

aw._loadResource('css', 'awTabContainer.css', 'css-tabs');

// declare the aw.TabContainer widget
aw.TabContainer = function(rootNode, optArgs) {
    var _root  = rootNode || document.createElement('div'),
        _tabs  = [],
        _curr  = 0,
        i      = 0,
        nd     = null,
        nCount = _root.childElementCount || lmnt.childElementCount(_root),
        lastId = 0,
        _registry = {},
        options = optArgs,
        currTitle = null,
        currPanel = null;

    // vars from old tabify()
    var __frag   = document.createDocumentFragment(),
        _tabRow  = document.createElement('ul'),
        _tabBody = document.createElement('div'),
        tabCount = 0;

    // initial setup
    _tabRow.className = 'tab-row';
    _tabBody.className = 'tab-body';
    __frag.appendChild(_tabRow);
    __frag.appendChild(_tabBody);


    function _getUniqueId() {
        var newVal = 'tab-' + lastId++;
        _registry[newVal] = newVal;
        return newVal;
    }

    function _delTab(id) {
        var lbl, pnl, newLbl, newPnl;
        if (id in _registry) {
            lbl = aw.core.byId(id+'-label');
            if (lbl.classList.contains('selected')) {
                lbl.classList.remove('selected');
                if (lbl.nextSibling) {
                    newLbl = lbl.nextSibling;
                } else if (lbl.previousSibling) {
                    newLbl = lbl.previousSibling;
                }
            }
            _tabRow.removeChild(lbl);
            pnl = aw.core.byId(id+'-panel');
            if (pnl.classList.contains('selected')) {
                pnl.classList.remove('selected');
                if (pnl.nextSibling) {
                    newPnl = pnl.nextSibling;
                } else if (pnl.previousSibling) {
                    newPnl = pnl.previousSibling;
                }
            }
            _tabBody.removeChild(pnl);
            if (newLbl && newPnl) { _selectTab(newLbl, newPnl); }
        }
    }

    function _selectTab(label, panel) {
        if (currPanel && currPanel != panel) {
            currTitle.classList.remove('selected');
            currPanel.classList.remove('selected');
        }
        currTitle = label;
        currPanel = panel;
        label.classList.add('selected');
        panel.classList.add('selected');
    }

    function _addTab(label, content) {
        var sID        = '',
            ndTab      = null,
            ndTabChild = null,
            ndPane     = null;

        sID = _getUniqueId();
        tabCount += 1;

        // create tab header
        ndTab = document.createElement('li');
        ndTab.className = 'tab';
        ndTab.id = sID+'-label';

        if (options.useHashLinks) {
            ndTabChild = document.createElement('a');
            ndTabChild.href = '#'+sID+'-panel';
        } else {
            ndTabChild = document.createElement('span');
        }
        ndTabChild.className = 'tab-label';
        ndTabChild.innerHTML = label;
        ndTab.appendChild(ndTabChild);

        // tab-close link
        ndTabChild = document.createElement('a');
        ndTabChild.className = 'tab-close-button';
        ndTabChild.innerHTML = '&times;';
        ndTabChild.onclick = function(ndTarget) {
            return function(e) {
                aw.core.stopEventCascade(e);

                // strip off the '-label' portion of the id
                if (ndTarget.id) { _delTab(ndTarget.id.substr(0, ndTarget.id.length-6)); }

                return false;
            }
        }(ndTab);
        ndTab.appendChild(ndTabChild);

        _tabRow.appendChild(ndTab);


        // create tab pane
        ndPane = document.createElement('div');
        ndPane.className = 'tab-panel';
        ndPane.id = sID+'-panel';
        ndPane.innerHTML = content;
        ndTab.onclick = function(ndTarget) {
            return function() {
                _selectTab(this, ndTarget);
            }
        }(ndPane);

        _tabBody.appendChild(ndPane);
        if (tabCount==1) {
            _selectTab(ndTab, ndPane);
        }
    }


    // grab any child elements (not raw text nodes) to form my initial tabs
    var elems = lmnt.children(_root);
    for (i=0; i<nCount; i++) {
        nd = elems[i];
        _addTab(nd.title ? nd.title : "Tab " + (tabCount+1), nd.innerHTML);
    }
    _root.innerHTML = '';
    _root.classList.add('tabcontainer');
    _root.appendChild(__frag);


    return {
        "root"      : _root,
        "tabs"      : _tabs,
        "currentTab": _curr,
        "addTab"    : _addTab,
        "deleteTab" : _delTab
    }
}
