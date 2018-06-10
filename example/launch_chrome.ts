import {RpsContext} from 'rpscript-api';
import chrome from 'rpscript-api/chrome';
import common from 'rpscript-api/common';

let $CONTEXT = new RpsContext();

let result = await chrome.Launch();

result = await chrome.run("page.goto",["https://www.google.com.sg"]);

result = await common.wait(5);

result = await chrome.run("page.goto",["https://www.github.com"]);

result = await chrome.run("close",[]);
