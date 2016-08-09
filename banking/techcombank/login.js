'use strict';

/**
 * Created by baohg on 16/06/2016.
 */
const request = require('request');
const fs = require('fs');
const _ = require('lodash');
const cheerio = require('cheerio');

var formToken;
var counter;
var cookie;
//var receiverId = "19028024924011";
var receiverId = "19030322434011";
var sotien = '50,000';
var details = 'alo alo';
var techcombank_page = 'https://ib.techcombank.com.vn/servlet/';


function getLoginPage() {
  return new Promise((fulfill, reject)=> {
    request(techcombank_page + 'BrowserServlet', (err, res, body) => {
      if (err) {
        reject(err)
      } else {
        var cookies = res.headers['set-cookie'];
        cookie = _.map(cookies, (string) => {
          return _.split(string, ';')[0];
        }).join('; ');

        var $ = cheerio.load(res.body);
        formToken = $('input[name="formToken"]').val();
        counter = $('input[name="counter"]').val();
        fulfill(res)
      }
    })
  })
};


function login() {
  var user_name = 'HOVIETTHUYEN';
  var password = 'tmp1234';
  var param = {
    url: techcombank_page + 'BrowserServlet',
    headers: {
      Cookie: cookie,
    },
    form: {
      formToken: formToken,
      command: 'login',
      requestType: 'CREATE.SESSION',
      counter: counter,
      branchAdminLogin: '',
      signOnNameEnabled: 'Y',
      signOnName: user_name,
      password: password,
      btn_login: 'Đăng nhập',
      MerchantId: '',
      Amount: '',
      Reference: '',
      language: 2,
      UserType: 'per'
    }
  };

  return new Promise((fulfill, reject)=> {
    request.post(param, (err, res, body) => {
      if (err) {
        reject(err)
      } else {
        var cookies = res.headers['set-cookie'];
        cookie = _.map(cookies, (string) => {
          return _.split(string, ';')[0];
        }).join('; ');
        var $ = cheerio.load(res.body);
        // Đã login xong
        // Tải trang contex
        var context = {
          id: $('td').eq(3).attr('id'),
          fragmenturl: $('td').eq(3).attr('fragmenturl'),
        };
        var param = {
          url: techcombank_page + context.fragmenturl,
          headers: {
            Cookie: cookie,
          },
        }
        // Đã load xong cái main body

        request.get(param, (err, res, body) => {
          if (err) {

          } else {

            var $ = cheerio.load(res.body);
            var menu = {
              id: $('td').eq(1).attr('id'),
              fragmenturl: $('td').eq(1).attr('fragmenturl'),
            };

            var param = {
              url: techcombank_page + menu.fragmenturl,
              headers: {
                Cookie: cookie,
              },
            }

            request.get(param, (err, res, body) => {
              if (err) {

              } else {
                var $ = cheerio.load(res.body);
                var form = 'form[name="generalForm"]';
                var formToken = $(`${form} input[name="formToken"]`).val();
                var WS_parentComposite = $(`${form} input[name="WS_parentComposite"]`).val();
                var WS_delMsgDisplayed = $(`${form} input[name="WS_delMsgDisplayed"]`).val();
                var application = $(`${form} input[name="application"]`).val();
                var ofsOperation = $(`${form} input[name="ofsOperation"]`).val();
                var ofsFunction = $(`${form} input[name="ofsFunction"]`).val();
                var ofsMessage = $(`${form} input[name="ofsMessage"]`).val();
                var version = $(`${form} input[name="version"]`).val();
                var transactionId = $(`${form} input[name="transactionId"]`).val();
                var command = $(`${form} input[name="command"]`).val();
                var operation = $(`${form} input[name="operation"]`).val();
                var apiArgument = $(`${form} input[name="apiArgument"]`).val();
                var name = $(`${form} input[name="name"]`).val();
                var enqname = $(`${form} input[name="enqname"]`).val();
                var enqaction = $(`${form} input[name="enqaction"]`).val();
                var dropfield = $(`${form} input[name="dropfield"]`).val();
                var previousEnqs = $(`${form} input[name="previousEnqs"]`).val();
                var previousEnqTitles = $(`${form} input[name="previousEnqTitles"]`).val();
                var clientStyleSheet = $(`${form} input[name="clientStyleSheet"]`).val();
                var unlock = $(`${form} input[name="unlock"]`).val();
                var allowResize = $(`${form} input[name="allowResize"]`).val();
                var companyId = $(`${form} input[name="companyId"]`).val();
                var company = $(`${form} input[name="company"]`).val();
                var transSign = $(`${form} input[name="transSign"]`).val();
                var skin = $(`${form} input[name="skin"]`).val();
                var today = $(`${form} input[name="today"]`).val();
                var release = $(`${form} input[name="release"]`).val();
                var compScreen = $(`${form} input[name="compScreen"]`).val();
                var reqTabid = $(`${form} input[name="reqTabid"]`).val();
                var compTargets = $(`${form} input[name="compTargets"]`).val();
                var EnqParentWindow = $(`${form} input[name="EnqParentWindow"]`).val();
                var timing = $(`${form} input[name="timing"]`).val();
                var pwprocessid = $(`${form} input[name="pwprocessid"]`).val();
                var language = $(`${form} input[name="language"]`).val();
                var languages = $(`${form} input[name="languages"]`).val();
                var savechanges = $(`${form} input[name="savechanges"]`).val();
                var staticId = $(`${form} input[name="staticId"]`).val();
                var lockDateTime = $(`${form} input[name="lockDateTime"]`).val();
                var popupDropDown = $(`${form} input[name="popupDropDown"]`).val();
                var allowcalendar = $(`${form} input[name="allowcalendar"]`).val();
                var allowdropdowns = $(`${form} input[name="allowdropdowns"]`).val();
                var allowcontext = $(`${form} input[name="allowcontext"]`).val();
                var nextStage = $(`${form} input[name="nextStage"]`).val();
                var maximize = $(`${form} input[name="maximize"]`).val();
                var showStatusInfo = $(`${form} input[name="showStatusInfo"]`).val();
                var languageUndefined = $(`${form} input[name="languageUndefined"]`).val();
                var expandMultiString = $(`${form} input[name="expandMultiString"]`).val();
                var deleteMultiString = $(`${form} input[name="deleteMultiString"]`).val();
                var expandSubString = $(`${form} input[name="expandSubString"]`).val();
                var clientExpansion = $(`${form} input[name="clientExpansion"]`).val();
                var WS_parentWindow = $(`${form} input[name="WS_parentWindow"]`).val();
                var WS_parent = $(`${form} input[name="WS_parent"]`).val();
                var WS_dropfield = $(`${form} input[name="WS_dropfield"]`).val();
                var WS_doResize = $(`${form} input[name="WS_doResize"]`).val();
                var WS_PauseTime = $(`${form} input[name="WS_PauseTime"]`).val();
                var WS_multiPane = $(`${form} input[name="WS_multiPane"]`).val();
                var WS_replaceAll = $(`${form} input[name="WS_replaceAll"]`).val();

                var param = {
                  url: techcombank_page + 'BrowserServlet',
                  headers: {
                    Cookie: cookie,
                  },
                  form: {
                    formToken: formToken,
                    requestType: 'UTILITY.ROUTINE',
                    routineName: 'OS.GET.COMPOSITE.SCREEN.XML',
                    routineArgs: 'COS AI.QCK.FT',
                    application: application,
                    ofsOperation: ofsOperation,
                    ofsFunction: ofsFunction,
                    ofsMessage: ofsMessage,
                    version: version,
                    transactionId: transactionId,
                    command: command,
                    operation: operation,
                    windowName: WS_parentComposite,
                    apiArgument: apiArgument,
                    name: name,
                    enqname: enqname,
                    enqaction: enqaction,
                    dropfield: dropfield,
                    previousEnqs: previousEnqs,
                    previousEnqTitles: previousEnqTitles,
                    clientStyleSheet: clientStyleSheet,
                    unlock: unlock,
                    allowResize: allowResize,
                    companyId: companyId,
                    company: company,
                    user: user_name,
                    transSign: transSign,
                    skin: skin,
                    today: today,
                    release: release,
                    compScreen: compScreen,
                    reqTabid: reqTabid,
                    compTargets: compTargets,
                    EnqParentWindow: EnqParentWindow,
                    timing: timing,
                    pwprocessid: pwprocessid,
                    language: language,
                    languages: languages,
                    savechanges: savechanges,
                    staticId: staticId,
                    lockDateTime: lockDateTime,
                    popupDropDown: popupDropDown,
                    allowcalendar: allowcalendar,
                    allowdropdowns: allowdropdowns,
                    allowcontext: allowcontext,
                    nextStage: nextStage,
                    maximize: maximize,
                    showStatusInfo: showStatusInfo,
                    languageUndefined: languageUndefined,
                    expandMultiString: expandMultiString,
                    deleteMultiString: deleteMultiString,
                    expandSubString: expandSubString,
                    clientExpansion: clientExpansion,
                    WS_parentWindow: WS_parentWindow,
                    WS_parent: WS_parent,
                    WS_dropfield: WS_dropfield,
                    WS_doResize: WS_doResize,
                    WS_initState: 'COS AI.QCK.FT',
                    WS_PauseTime: WS_PauseTime,
                    WS_multiPane: WS_multiPane,
                    WS_replaceAll: WS_replaceAll,
                    WS_parentComposite: WS_parentComposite,
                    WS_delMsgDisplayed: WS_delMsgDisplayed,
                    WS_FragmentName: WS_parentComposite
                  }
                }
                request.post(param, (err, res, body) => {
                  if (err) {

                  } else {
                    var $ = cheerio.load(res.body);
                    var menu = {
                      id: $('td').eq(1).attr('id'),
                      fragmenturl: $('td').eq(1).attr('fragmenturl'),
                    };

                    var main = {
                      id: $('td').eq(4).attr('id'),
                      fragmenturl: $('td').eq(4).attr('fragmenturl'),
                    };


                    var param = {
                      url: techcombank_page + menu.fragmenturl,
                      headers: {
                        Cookie: cookie,
                      },
                    }

                    request.get(param, (err, res, body) => {
                      if (err) {

                      } else {
                        var $ = cheerio.load(res.body);
                        var form = 'form[name="generalForm"]';
                        var formToken = $(`${form} input[name="formToken"]`).val();
                        var ofsOperation = $(`${form} input[name="ofsOperation"]`).val();
                        var ofsMessage = $(`${form} input[name="ofsMessage"]`).val();
                        var command = $(`${form} input[name="command"]`).val();
                        var operation = $(`${form} input[name="operation"]`).val();
                        var apiArgument = $(`${form} input[name="apiArgument"]`).val();
                        var name = $(`${form} input[name="name"]`).val();
                        var enqname = $(`${form} input[name="enqname"]`).val();
                        var enqaction = $(`${form} input[name="enqaction"]`).val();
                        var dropfield = $(`${form} input[name="dropfield"]`).val();
                        var previousEnqs = $(`${form} input[name="previousEnqs"]`).val();
                        var previousEnqTitles = $(`${form} input[name="previousEnqTitles"]`).val();
                        var clientStyleSheet = $(`${form} input[name="clientStyleSheet"]`).val();
                        var allowResize = $(`${form} input[name="allowResize"]`).val();
                        var companyId = $(`${form} input[name="companyId"]`).val();
                        var company = $(`${form} input[name="company"]`).val();
                        var transSign = $(`${form} input[name="transSign"]`).val();
                        var skin = $(`${form} input[name="skin"]`).val();
                        var today = $(`${form} input[name="today"]`).val();
                        var release = $(`${form} input[name="release"]`).val();
                        var compScreen = $(`${form} input[name="compScreen"]`).val();
                        var reqTabid = $(`${form} input[name="reqTabid"]`).val();
                        var compTargets = $(`${form} input[name="compTargets"]`).val();
                        var EnqParentWindow = $(`${form} input[name="EnqParentWindow"]`).val();
                        var timing = $(`${form} input[name="timing"]`).val();
                        var pwprocessid = $(`${form} input[name="pwprocessid"]`).val();
                        var language = $(`${form} input[name="language"]`).val();
                        var languages = $(`${form} input[name="languages"]`).val();
                        var savechanges = $(`${form} input[name="savechanges"]`).val();
                        var staticId = $(`${form} input[name="staticId"]`).val();
                        var lockDateTime = $(`${form} input[name="lockDateTime"]`).val();
                        var popupDropDown = $(`${form} input[name="popupDropDown"]`).val();
                        var allowcalendar = $(`${form} input[name="allowcalendar"]`).val();
                        var allowdropdowns = $(`${form} input[name="allowdropdowns"]`).val();
                        var allowcontext = $(`${form} input[name="allowcontext"]`).val();
                        var nextStage = $(`${form} input[name="nextStage"]`).val();
                        var maximize = $(`${form} input[name="maximize"]`).val();
                        var showStatusInfo = $(`${form} input[name="showStatusInfo"]`).val();
                        var languageUndefined = $(`${form} input[name="languageUndefined"]`).val();
                        var expandMultiString = $(`${form} input[name="expandMultiString"]`).val();
                        var deleteMultiString = $(`${form} input[name="deleteMultiString"]`).val();
                        var expandSubString = $(`${form} input[name="expandSubString"]`).val();
                        var clientExpansion = $(`${form} input[name="clientExpansion"]`).val();
                        var WS_parentWindow = $(`${form} input[name="WS_parentWindow"]`).val();
                        var WS_parent = $(`${form} input[name="WS_parent"]`).val();
                        var WS_dropfield = $(`${form} input[name="WS_dropfield"]`).val();
                        var WS_doResize = $(`${form} input[name="WS_doResize"]`).val();
                        var WS_PauseTime = $(`${form} input[name="WS_PauseTime"]`).val();
                        var WS_multiPane = $(`${form} input[name="WS_multiPane"]`).val();
                        var WS_replaceAll = $(`${form} input[name="WS_replaceAll"]`).val();
                        var WS_delMsgDisplayed = $(`${form} input[name="WS_delMsgDisplayed"]`).val();
                        var param = {
                          url: techcombank_page + 'BrowserServlet',
                          headers: {
                            Cookie: cookie,
                          },
                          form: {
                            formToken: formToken,
                            requestType: 'UTILITY.ROUTINE',
                            routineName: 'OS.NEW.DEAL',
                            routineArgs: 'FT,AI.QCK.INT.INP.TCB I F3',
                            application: 'FT',
                            ofsOperation: ofsOperation,
                            ofsFunction: 'I',
                            ofsMessage: ofsMessage,
                            version: ',AI.QCK.INT.INP.TCB',
                            transactionId: 'F3',
                            command: command,
                            operation: operation,
                            windowName: main.id,
                            apiArgument: apiArgument,
                            name: name,
                            enqname: enqname,
                            enqaction: enqaction,
                            dropfield: dropfield,
                            previousEnqs: previousEnqs,
                            previousEnqTitles: previousEnqTitles,
                            clientStyleSheet: clientStyleSheet,
                            unlock: 'NO.UNLOCK',
                            allowResize: allowResize,
                            companyId: companyId,
                            company: company,
                            user: user_name,
                            transSign: transSign,
                            skin: skin,
                            today: today,
                            release: release,
                            compScreen: compScreen,
                            reqTabid: reqTabid,
                            compTargets: compTargets,
                            EnqParentWindow: EnqParentWindow,
                            timing: timing,
                            pwprocessid: pwprocessid,
                            language: language,
                            languages: languages,
                            savechanges: savechanges,
                            staticId: staticId,
                            lockDateTime: lockDateTime,
                            popupDropDown: popupDropDown,
                            allowcalendar: allowcalendar,
                            allowdropdowns: allowdropdowns,
                            allowcontext: allowcontext,
                            nextStage: nextStage,
                            maximize: maximize,
                            showStatusInfo: showStatusInfo,
                            languageUndefined: languageUndefined,
                            expandMultiString: expandMultiString,
                            deleteMultiString: deleteMultiString,
                            expandSubString: expandSubString,
                            clientExpansion: clientExpansion,
                            WS_parentWindow: WS_parentWindow,
                            WS_parent: WS_parent,
                            WS_dropfield: WS_dropfield,
                            WS_doResize: WS_doResize,
                            WS_initState: 'FT,AI.QCK.INT.INP.TCB I F3',
                            WS_PauseTime: WS_PauseTime,
                            WS_multiPane: WS_multiPane,
                            WS_replaceAll: WS_replaceAll,
                            WS_parentComposite: WS_parentComposite,
                            WS_delMsgDisplayed: WS_delMsgDisplayed,
                            WS_FragmentName: WS_parentComposite,

                          }
                        }

                        request.post(param, (err, res, body)=> {
                          if (err) {

                          } else {
                            var $ = cheerio.load(res.body);
                            var form = 'form[name="appreq"]';
                            var formToken = $(`${form} input[name="formToken"]`).val();
                            var toggle = $(`${form} input[name="toggle"]`).val();
                            var command = $(`${form} input[name="command"]`).val();
                            var ofsMessage = $(`${form} input[name="ofsMessage"]`).val();
                            var GTSControl = $(`${form} input[name="GTSControl"]`).val();
                            var routineName = $(`${form} input[name="routineName"]`).val();
                            var cfNavOperation = $(`${form} input[name="cfNavOperation"]`).val();
                            var unlock = $(`${form} input[name="unlock"]`).val();
                            var activeTab = $(`${form} input[name="activeTab"]`).val();
                            var SaveChangesText = $(`${form} input[name="SaveChangesText"]`).val();
                            var RecordDelText = $(`${form} input[name="RecordDelText"]`).val();
                            var expansionHistory = $(`${form} input[name="expansionHistory"]`).val();
                            var version = $(`${form} input[name="version"]`).val();
                            var application = $(`${form} input[name="application"]`).val();
                            var enableDealSlip = $(`${form} input[name="enableDealSlip"]`).val();
                            var decrypt = $(`${form} input[name="decrypt"]`).val();
                            var addGroupTab = $(`${form} input[name="addGroupTab"]`).val();
                            var deleteGroupTab = $(`${form} input[name="deleteGroupTab"]`).val();
                            var expandableTab = $(`${form} input[name="expandableTab"]`).val();
                            var tabEnri = $(`${form} input[name="tabEnri"]`).val();
                            var product = $(`${form} input[name="product"]`).val();
                            var name = $(`${form} input[name="name="]`).val();
                            var operation = $(`${form} input[name="operation"]`).val();
                            var toolbarTarget = $(`${form} input[name="toolbarTarget"]`).val();
                            var overridesAccepted = $(`${form} input[name="overridesAccepted"]`).val();
                            var overridesApproved = $(`${form} input[name="overridesApproved"]`).val();
                            var focus = $(`${form} input[name="focus"]`).val();
                            var ContractStatus = $(`${form} input[name="ContractStatus"]`).val();
                            var windowUnqRef = $(`${form} input[name="windowUnqRef"]`).val();
                            var editVersion = $(`${form} input[name="editVersion"]`).val();
                            var confirmVersion = $(`${form} input[name="confirmVersion"]`).val();
                            var previewVersion = $(`${form} input[name="previewVersion"]`).val();
                            var enqname = $(`${form} input[name="enqname"]`).val();
                            var enqaction = $(`${form} input[name="enqaction"]`).val();
                            var dropfield = $(`${form} input[name="dropfield"]`).val();
                            var previousEnqs = $(`${form} input[name="previousEnqs"]`).val();
                            var previousEnqTitles = $(`${form} input[name="previousEnqTitles"]`).val();
                            var clientStyleSheet = $(`${form} input[name="clientStyleSheet"]`).val();
                            var windowSizes = $(`${form} input[name="windowSizes"]`).val();
                            var newCommands = $(`${form} input[name="newCommands"]`).val();
                            var screenMode = $(`${form} input[name="screenMode"]`).val();
                            var lockArgs = $(`${form} input[name="lockArgs"]`).val();
                            var RecordRead = $(`${form} input[name="RecordRead"]`).val();
                            var PastedDeal = $(`${form} input[name="PastedDeal"]`).val();
                            var allowResize = $(`${form} input[name="allowResize"]`).val();
                            var companyId = $(`${form} input[name="companyId"]`).val();
                            var company = $(`${form} input[name="company"]`).val();
                            var transSign = $(`${form} input[name="transSign"]`).val();
                            var skin = $(`${form} input[name="skin"]`).val();
                            var today = $(`${form} input[name="today"]`).val();
                            var release = $(`${form} input[name="release"]`).val();
                            var compScreen = $(`${form} input[name="compScreen"]`).val();
                            var reqTabid = $(`${form} input[name="reqTabid"]`).val();
                            var compTargets = $(`${form} input[name="compTargets"]`).val();
                            var EnqParentWindow = $(`${form} input[name="EnqParentWindow"]`).val();
                            var timing = $(`${form} input[name="timing"]`).val();
                            var pwprocessid = $(`${form} input[name="pwprocessid"]`).val();
                            var language = $(`${form} input[name="language"]`).val();
                            var languages = $(`${form} input[name="languages"]`).val();
                            var savechanges = $(`${form} input[name="savechanges"]`).val();
                            var staticId = $(`${form} input[name="staticId"]`).val();
                            var lockDateTime = $(`${form} input[name="lockDateTime"]`).val();
                            var popupDropDown = $(`${form} input[name="popupDropDown"]`).val();
                            var allowcalendar = $(`${form} input[name="allowcalendar"]`).val();
                            var allowdropdowns = $(`${form} input[name="allowdropdowns"]`).val();
                            var allowcontext = $(`${form} input[name="allowcontext"]`).val();
                            var nextStage = $(`${form} input[name="nextStage"]`).val();
                            var maximize = $(`${form} input[name="maximize"]`).val();
                            var showStatusInfo = $(`${form} input[name="showStatusInfo"]`).val();
                            var languageUndefined = $(`${form} input[name="languageUndefined"]`).val();
                            var expandMultiString = $(`${form} input[name="expandMultiString"]`).val();
                            var deleteMultiString = $(`${form} input[name="deleteMultiString"]`).val();
                            var expandSubString = $(`${form} input[name="expandSubString"]`).val();

                            var WS_parentWindow = $(`${form} input[name="WS_parentWindow"]`).val();
                            var WS_parent = $(`${form} input[name="WS_parent"]`).val();
                            var WS_dropfield = $(`${form} input[name="WS_dropfield"]`).val();
                            var WS_doResize = $(`${form} input[name="WS_doResize"]`).val();
                            var WS_initState = $(`${form} input[name="WS_initState"]`).val();
                            var WS_PauseTime = $(`${form} input[name="WS_PauseTime"]`).val();
                            var WS_multiPane = $(`${form} input[name="WS_multiPane"]`).val();
                            var WS_replaceAll = $(`${form} input[name="WS_replaceAll"]`).val();
                            var WS_parentComposite = $(`${form} input[name="WS_parentComposite"]`).val();
                            var WS_delMsgDisplayed = $(`${form} input[name="WS_delMsgDisplayed"]`).val();
                            var transactionId = $(`${form} input[name="transactionId"]`).val();
                            var PROCESSING_DATE = $(`${form} input[name="transactionId"]`).val();
                            var senderId = $('input[name="fieldName:DEBIT.ACCT.NO"]').val();
                            var param = {
                              url: techcombank_page + 'BrowserServlet',
                              headers: {
                                Cookie: cookie,
                              },
                              form: {
                                formToken: formToken,
                                toggle: toggle,
                                command: command,
                                requestType: 'OFS.APPLICATION',
                                ofsOperation: 'BUILD',
                                ofsFunction: 'I',
                                ofsMessage: ofsMessage,
                                GTSControl: GTSControl,
                                routineName: routineName,
                                routineArgs: 'HOT_fieldName:ACCT.NO.OTH',
                                cfNavOperation: cfNavOperation,
                                unlock: unlock,
                                activeTab: activeTab,
                                SaveChangesText: SaveChangesText,
                                RecordDelText: RecordDelText,
                                expansionHistory: expansionHistory,
                                version: version,
                                application: application,
                                enableDealSlip: enableDealSlip,
                                decrypt: decrypt,
                                addGroupTab: addGroupTab,
                                deleteGroupTab: deleteGroupTab,
                                expandableTab: expandableTab,
                                tabEnri: tabEnri,
                                product: product,
                                name: name,
                                operation: operation,
                                windowName: main.id,
                                toolbarTarget: toolbarTarget,
                                overridesAccepted: overridesAccepted,
                                overridesApproved: overridesApproved,
                                focus: focus,
                                ContractStatus: ContractStatus,
                                windowUnqRef: windowUnqRef,
                                editVersion: editVersion,
                                confirmVersion: confirmVersion,
                                previewVersion: previewVersion,
                                enqname: enqname,
                                enqaction: enqaction,
                                dropfield: dropfield,
                                previousEnqs: previousEnqs,
                                previousEnqTitles: previousEnqTitles,
                                clientStyleSheet: clientStyleSheet,
                                windowSizes: windowSizes,
                                changedFields: 'fieldName:ACCT.NO.OTH',
                                newCommands: newCommands,
                                screenMode: screenMode,
                                lockArgs: lockArgs,
                                RecordRead: RecordRead,
                                PastedDeal: PastedDeal,
                                allowResize: allowResize,
                                companyId: companyId,
                                company: company,
                                user: user_name,
                                transSign: transSign,
                                skin: skin,
                                today: today,
                                release: release,
                                compScreen: compScreen,
                                reqTabid: reqTabid,
                                compTargets: compTargets,
                                EnqParentWindow: EnqParentWindow,
                                timing: timing,
                                pwprocessid: pwprocessid,
                                language: language,
                                languages: languages,
                                savechanges: savechanges,
                                staticId: staticId,
                                lockDateTime: lockDateTime,
                                popupDropDown: popupDropDown,
                                allowcalendar: allowcalendar,
                                allowdropdowns: allowdropdowns,
                                allowcontext: allowcontext,
                                nextStage: nextStage,
                                maximize: maximize,
                                showStatusInfo: showStatusInfo,
                                languageUndefined: languageUndefined,
                                expandMultiString: expandMultiString,
                                deleteMultiString: deleteMultiString,
                                expandSubString: expandSubString,
                                clientExpansion: clientExpansion,
                                WS_parentWindow: WS_parentWindow,
                                WS_parent: WS_parent,
                                WS_dropfield: WS_dropfield,
                                WS_doResize: WS_doResize,
                                WS_initState: WS_initState,
                                WS_PauseTime: WS_PauseTime,
                                WS_multiPane: WS_multiPane,
                                WS_replaceAll: WS_replaceAll,
                                WS_parentComposite: WS_parentComposite,
                                WS_delMsgDisplayed: WS_delMsgDisplayed,
                                transactionId: transactionId,
                                'fieldName:DEBIT.ACCT.NO': senderId,
                                'fieldName:SRC.ACCT.NAME': 'TIEN GUI THANH TOAN',
                                'fieldName:SRC.CURR.BAL': 'VND 0',
                                'fieldName:ACCT.NO.OTH': receiverId,
                                'fieldName:CREDIT.ACCT.NO': '',
                                'fieldName:TAR.ACCT.NAME': '',
                                'fieldName:PAYMENT.DETAILS:1': 'TECHCOMBANK',
                                'CheckBox:fieldName:ARC.CHECK': 'on',
                                'fieldName:ARC.CHECK': '',
                                'fieldName:DEBIT.AMOUNT': '',
                                'fieldName:DEBIT.CURRENCY': 'VND',
                                'fieldName:PROCESSING.DATE': today,
                                'fieldName:PAY.DETAILS': '',
                                'fieldName:UPDATE.MT103': 'YES',
                                WS_FragmentName: main.id

                              }
                            };
                            request.post(param, (err, res, body)=> {
                              if (err) {

                              } else {
                                var $ = cheerio.load(res.body);
                                var receiverName = $('span[id="disabled_TAR.ACCT.NAME"]').text();
                                var form = 'form[name="appreq"]';
                                var formToken = $(`${form} input[name="formToken"]`).val();
                                var toggle = $(`${form} input[name="toggle"]`).val();
                                var command = $(`${form} input[name="command"]`).val();
                                var ofsMessage = $(`${form} input[name="ofsMessage"]`).val();
                                var GTSControl = $(`${form} input[name="GTSControl"]`).val();
                                var routineName = $(`${form} input[name="routineName"]`).val();
                                var cfNavOperation = $(`${form} input[name="cfNavOperation"]`).val();
                                var unlock = $(`${form} input[name="unlock"]`).val();
                                var activeTab = $(`${form} input[name="activeTab"]`).val();
                                var SaveChangesText = $(`${form} input[name="SaveChangesText"]`).val();
                                var RecordDelText = $(`${form} input[name="RecordDelText"]`).val();
                                var expansionHistory = $(`${form} input[name="expansionHistory"]`).val();
                                var version = $(`${form} input[name="version"]`).val();
                                var application = $(`${form} input[name="application"]`).val();
                                var enableDealSlip = $(`${form} input[name="enableDealSlip"]`).val();
                                var decrypt = $(`${form} input[name="decrypt"]`).val();
                                var addGroupTab = $(`${form} input[name="addGroupTab"]`).val();
                                var deleteGroupTab = $(`${form} input[name="deleteGroupTab"]`).val();
                                var expandableTab = $(`${form} input[name="expandableTab"]`).val();
                                var tabEnri = $(`${form} input[name="tabEnri"]`).val();
                                var product = $(`${form} input[name="product"]`).val();
                                var name = $(`${form} input[name="name="]`).val();
                                var operation = $(`${form} input[name="operation"]`).val();
                                var toolbarTarget = $(`${form} input[name="toolbarTarget"]`).val();
                                var overridesAccepted = $(`${form} input[name="overridesAccepted"]`).val();
                                var overridesApproved = $(`${form} input[name="overridesApproved"]`).val();
                                var focus = $(`${form} input[name="focus"]`).val();
                                var ContractStatus = $(`${form} input[name="ContractStatus"]`).val();
                                var windowUnqRef = $(`${form} input[name="windowUnqRef"]`).val();
                                var editVersion = $(`${form} input[name="editVersion"]`).val();
                                var confirmVersion = $(`${form} input[name="confirmVersion"]`).val();
                                var previewVersion = $(`${form} input[name="previewVersion"]`).val();
                                var enqname = $(`${form} input[name="enqname"]`).val();
                                var enqaction = $(`${form} input[name="enqaction"]`).val();
                                var dropfield = $(`${form} input[name="dropfield"]`).val();
                                var previousEnqs = $(`${form} input[name="previousEnqs"]`).val();
                                var previousEnqTitles = $(`${form} input[name="previousEnqTitles"]`).val();
                                var clientStyleSheet = $(`${form} input[name="clientStyleSheet"]`).val();
                                var windowSizes = $(`${form} input[name="windowSizes"]`).val();
                                var newCommands = $(`${form} input[name="newCommands"]`).val();
                                var screenMode = $(`${form} input[name="screenMode"]`).val();
                                var lockArgs = $(`${form} input[name="lockArgs"]`).val();
                                var RecordRead = $(`${form} input[name="RecordRead"]`).val();
                                var PastedDeal = $(`${form} input[name="PastedDeal"]`).val();
                                var allowResize = $(`${form} input[name="allowResize"]`).val();
                                var companyId = $(`${form} input[name="companyId"]`).val();
                                var company = $(`${form} input[name="company"]`).val();
                                var transSign = $(`${form} input[name="transSign"]`).val();
                                var skin = $(`${form} input[name="skin"]`).val();
                                var today = $(`${form} input[name="today"]`).val();
                                var release = $(`${form} input[name="release"]`).val();
                                var compScreen = $(`${form} input[name="compScreen"]`).val();
                                var reqTabid = $(`${form} input[name="reqTabid"]`).val();
                                var compTargets = $(`${form} input[name="compTargets"]`).val();
                                var EnqParentWindow = $(`${form} input[name="EnqParentWindow"]`).val();
                                var timing = $(`${form} input[name="timing"]`).val();
                                var pwprocessid = $(`${form} input[name="pwprocessid"]`).val();
                                var language = $(`${form} input[name="language"]`).val();
                                var languages = $(`${form} input[name="languages"]`).val();
                                var savechanges = $(`${form} input[name="savechanges"]`).val();
                                var staticId = $(`${form} input[name="staticId"]`).val();
                                var lockDateTime = $(`${form} input[name="lockDateTime"]`).val();
                                var popupDropDown = $(`${form} input[name="popupDropDown"]`).val();
                                var allowcalendar = $(`${form} input[name="allowcalendar"]`).val();
                                var allowdropdowns = $(`${form} input[name="allowdropdowns"]`).val();
                                var allowcontext = $(`${form} input[name="allowcontext"]`).val();
                                var nextStage = $(`${form} input[name="nextStage"]`).val();
                                var maximize = $(`${form} input[name="maximize"]`).val();
                                var showStatusInfo = $(`${form} input[name="showStatusInfo"]`).val();
                                var languageUndefined = $(`${form} input[name="languageUndefined"]`).val();
                                var expandMultiString = $(`${form} input[name="expandMultiString"]`).val();
                                var deleteMultiString = $(`${form} input[name="deleteMultiString"]`).val();
                                var expandSubString = $(`${form} input[name="expandSubString"]`).val();

                                var WS_parentWindow = $(`${form} input[name="WS_parentWindow"]`).val();
                                var WS_parent = $(`${form} input[name="WS_parent"]`).val();
                                var WS_dropfield = $(`${form} input[name="WS_dropfield"]`).val();
                                var WS_doResize = $(`${form} input[name="WS_doResize"]`).val();
                                var WS_initState = $(`${form} input[name="WS_initState"]`).val();
                                var WS_PauseTime = $(`${form} input[name="WS_PauseTime"]`).val();
                                var WS_multiPane = $(`${form} input[name="WS_multiPane"]`).val();
                                var WS_replaceAll = $(`${form} input[name="WS_replaceAll"]`).val();
                                var WS_parentComposite = $(`${form} input[name="WS_parentComposite"]`).val();
                                var WS_delMsgDisplayed = $(`${form} input[name="WS_delMsgDisplayed"]`).val();
                                var transactionId = $(`${form} input[name="transactionId"]`).val();


                                var param = {
                                  url: techcombank_page + 'BrowserServlet',
                                  headers: {
                                    Cookie: cookie,
                                  },
                                  form: {
                                    formToken: formToken,
                                    toggle: toggle,
                                    command: command,
                                    requestType: 'OFS.APPLICATION',
                                    ofsOperation: 'PROCESS',
                                    ofsFunction: 'I',
                                    ofsMessage: ofsMessage,
                                    GTSControl: GTSControl,
                                    routineName: routineName,
                                    routineArgs: '',
                                    cfNavOperation: cfNavOperation,
                                    unlock: unlock,
                                    activeTab: activeTab,
                                    SaveChangesText: SaveChangesText,
                                    RecordDelText: RecordDelText,
                                    expansionHistory: expansionHistory,
                                    version: version,
                                    application: application,
                                    enableDealSlip: enableDealSlip,
                                    decrypt: decrypt,
                                    addGroupTab: addGroupTab,
                                    deleteGroupTab: deleteGroupTab,
                                    expandableTab: expandableTab,
                                    tabEnri: tabEnri,
                                    product: product,
                                    name: "",
                                    operation: operation,
                                    windowName: main.id,
                                    toolbarTarget: toolbarTarget,
                                    overridesAccepted: overridesAccepted,
                                    overridesApproved: overridesApproved,
                                    focus: focus,
                                    ContractStatus: ContractStatus,
                                    windowUnqRef: windowUnqRef,
                                    editVersion: editVersion,
                                    confirmVersion: confirmVersion,
                                    previewVersion: previewVersion,
                                    enqname: enqname,
                                    enqaction: enqaction,
                                    dropfield: dropfield,
                                    previousEnqs: previousEnqs,
                                    previousEnqTitles: previousEnqTitles,
                                    clientStyleSheet: clientStyleSheet,
                                    windowSizes: windowSizes,
                                    changedFields: 'fieldName:DEBIT.AMOUNT fieldName:PAY.DETAILS',
                                    newCommands: newCommands,
                                    screenMode: screenMode,
                                    lockArgs: lockArgs,
                                    RecordRead: RecordRead,
                                    PastedDeal: PastedDeal,
                                    allowResize: allowResize,
                                    companyId: companyId,
                                    company: company,
                                    user: user_name,
                                    transSign: transSign,
                                    skin: skin,
                                    today: today,
                                    release: release,
                                    compScreen: compScreen,
                                    reqTabid: reqTabid,
                                    compTargets: compTargets,
                                    EnqParentWindow: EnqParentWindow,
                                    timing: timing,
                                    pwprocessid: pwprocessid,
                                    language: language,
                                    languages: languages,
                                    savechanges: savechanges,
                                    staticId: staticId,
                                    lockDateTime: lockDateTime,
                                    popupDropDown: popupDropDown,
                                    allowcalendar: allowcalendar,
                                    allowdropdowns: allowdropdowns,
                                    allowcontext: allowcontext,
                                    nextStage: nextStage,
                                    maximize: maximize,
                                    showStatusInfo: showStatusInfo,
                                    languageUndefined: languageUndefined,
                                    expandMultiString: expandMultiString,
                                    deleteMultiString: deleteMultiString,
                                    expandSubString: expandSubString,
                                    clientExpansion: clientExpansion,
                                    WS_parentWindow: WS_parentWindow,
                                    WS_parent: WS_parent,
                                    WS_dropfield: WS_dropfield,
                                    WS_doResize: WS_doResize,
                                    WS_initState: WS_initState,
                                    WS_PauseTime: WS_PauseTime,
                                    WS_multiPane: WS_multiPane,
                                    WS_replaceAll: WS_replaceAll,
                                    WS_parentComposite: WS_parentComposite,
                                    WS_delMsgDisplayed: WS_delMsgDisplayed,
                                    transactionId: transactionId,
                                    'fieldName:DEBIT.ACCT.NO': senderId,
                                    'fieldName:SRC.ACCT.NAME': 'TIEN GUI THANH TOAN',
                                    'fieldName:SRC.CURR.BAL': 'VND 0',
                                    'fieldName:ACCT.NO.OTH': receiverId,
                                    'fieldName:CREDIT.ACCT.NO': receiverId,
                                    'fieldName:TAR.ACCT.NAME': receiverName,
                                    'fieldName:PAYMENT.DETAILS:1': 'TECHCOMBANK',
                                    'CheckBox:fieldName:ARC.CHECK': 'on',
                                    'fieldName:ARC.CHECK': '',
                                    'fieldName:DEBIT.AMOUNT': sotien,
                                    'fieldName:DEBIT.CURRENCY': 'VND',
                                    'fieldName:PROCESSING.DATE': today,
                                    'fieldName:PAY.DETAILS': details,
                                    'fieldName:UPDATE.MT103': 'YES',
                                    WS_FragmentName: main.id
                                  }
                                };


                                request.post(param, (err, res, body)=> {
                                  if (err) {

                                  } else {
                                    var $ = cheerio.load(res.body);
                                    var receiverName = $('span[id="disabled_TAR.ACCT.NAME"]').text();
                                    var form = 'form[name="appreq"]';
                                    var formToken = $(`${form} input[name="formToken"]`).val();
                                    var toggle = $(`${form} input[name="toggle"]`).val();
                                    var command = $(`${form} input[name="command"]`).val();
                                    var ofsMessage = $(`${form} input[name="ofsMessage"]`).val();
                                    var GTSControl = $(`${form} input[name="GTSControl"]`).val();
                                    var routineName = $(`${form} input[name="routineName"]`).val();
                                    var cfNavOperation = $(`${form} input[name="cfNavOperation"]`).val();
                                    var unlock = $(`${form} input[name="unlock"]`).val();
                                    var activeTab = $(`${form} input[name="activeTab"]`).val();
                                    var SaveChangesText = $(`${form} input[name="SaveChangesText"]`).val();
                                    var RecordDelText = $(`${form} input[name="RecordDelText"]`).val();
                                    var expansionHistory = $(`${form} input[name="expansionHistory"]`).val();
                                    var version = $(`${form} input[name="version"]`).val();
                                    var application = $(`${form} input[name="application"]`).val();
                                    var enableDealSlip = $(`${form} input[name="enableDealSlip"]`).val();
                                    var decrypt = $(`${form} input[name="decrypt"]`).val();
                                    var addGroupTab = $(`${form} input[name="addGroupTab"]`).val();
                                    var deleteGroupTab = $(`${form} input[name="deleteGroupTab"]`).val();
                                    var expandableTab = $(`${form} input[name="expandableTab"]`).val();
                                    var tabEnri = $(`${form} input[name="tabEnri"]`).val();
                                    var product = $(`${form} input[name="product"]`).val();
                                    var name = $(`${form} input[name="name="]`).val();
                                    var operation = $(`${form} input[name="operation"]`).val();
                                    var toolbarTarget = $(`${form} input[name="toolbarTarget"]`).val();
                                    var overridesAccepted = $(`${form} input[name="overridesAccepted"]`).val();
                                    var overridesApproved = $(`${form} input[name="overridesApproved"]`).val();
                                    var focus = $(`${form} input[name="focus"]`).val();
                                    var ContractStatus = $(`${form} input[name="ContractStatus"]`).val();
                                    var windowUnqRef = $(`${form} input[name="windowUnqRef"]`).val();
                                    var editVersion = $(`${form} input[name="editVersion"]`).val();
                                    var confirmVersion = $(`${form} input[name="confirmVersion"]`).val();
                                    var previewVersion = $(`${form} input[name="previewVersion"]`).val();
                                    var enqname = $(`${form} input[name="enqname"]`).val();
                                    var enqaction = $(`${form} input[name="enqaction"]`).val();
                                    var dropfield = $(`${form} input[name="dropfield"]`).val();
                                    var previousEnqs = $(`${form} input[name="previousEnqs"]`).val();
                                    var previousEnqTitles = $(`${form} input[name="previousEnqTitles"]`).val();
                                    var clientStyleSheet = $(`${form} input[name="clientStyleSheet"]`).val();
                                    var windowSizes = $(`${form} input[name="windowSizes"]`).val();
                                    var newCommands = $(`${form} input[name="newCommands"]`).val();
                                    var screenMode = $(`${form} input[name="screenMode"]`).val();
                                    var lockArgs = $(`${form} input[name="lockArgs"]`).val();
                                    var RecordRead = $(`${form} input[name="RecordRead"]`).val();
                                    var PastedDeal = $(`${form} input[name="PastedDeal"]`).val();
                                    var allowResize = $(`${form} input[name="allowResize"]`).val();
                                    var companyId = $(`${form} input[name="companyId"]`).val();
                                    var company = $(`${form} input[name="company"]`).val();
                                    var transSign = $(`${form} input[name="transSign"]`).val();
                                    var skin = $(`${form} input[name="skin"]`).val();
                                    var today = $(`${form} input[name="today"]`).val();
                                    var release = $(`${form} input[name="release"]`).val();
                                    var compScreen = $(`${form} input[name="compScreen"]`).val();
                                    var reqTabid = $(`${form} input[name="reqTabid"]`).val();
                                    var compTargets = $(`${form} input[name="compTargets"]`).val();
                                    var EnqParentWindow = $(`${form} input[name="EnqParentWindow"]`).val();
                                    var timing = $(`${form} input[name="timing"]`).val();
                                    var pwprocessid = $(`${form} input[name="pwprocessid"]`).val();
                                    var language = $(`${form} input[name="language"]`).val();
                                    var languages = $(`${form} input[name="languages"]`).val();
                                    var savechanges = $(`${form} input[name="savechanges"]`).val();
                                    var staticId = $(`${form} input[name="staticId"]`).val();
                                    var lockDateTime = $(`${form} input[name="lockDateTime"]`).val();
                                    var popupDropDown = $(`${form} input[name="popupDropDown"]`).val();
                                    var allowcalendar = $(`${form} input[name="allowcalendar"]`).val();
                                    var allowdropdowns = $(`${form} input[name="allowdropdowns"]`).val();
                                    var allowcontext = $(`${form} input[name="allowcontext"]`).val();
                                    var nextStage = $(`${form} input[name="nextStage"]`).val();
                                    var maximize = $(`${form} input[name="maximize"]`).val();
                                    var showStatusInfo = $(`${form} input[name="showStatusInfo"]`).val();
                                    var languageUndefined = $(`${form} input[name="languageUndefined"]`).val();
                                    var expandMultiString = $(`${form} input[name="expandMultiString"]`).val();
                                    var deleteMultiString = $(`${form} input[name="deleteMultiString"]`).val();
                                    var expandSubString = $(`${form} input[name="expandSubString"]`).val();

                                    var WS_parentWindow = $(`${form} input[name="WS_parentWindow"]`).val();
                                    var WS_parent = $(`${form} input[name="WS_parent"]`).val();
                                    var WS_dropfield = $(`${form} input[name="WS_dropfield"]`).val();
                                    var WS_doResize = $(`${form} input[name="WS_doResize"]`).val();
                                    var WS_initState = $(`${form} input[name="WS_initState"]`).val();
                                    var WS_PauseTime = $(`${form} input[name="WS_PauseTime"]`).val();
                                    var WS_multiPane = $(`${form} input[name="WS_multiPane"]`).val();
                                    var WS_replaceAll = $(`${form} input[name="WS_replaceAll"]`).val();
                                    var WS_parentComposite = $(`${form} input[name="WS_parentComposite"]`).val();
                                    var WS_delMsgDisplayed = $(`${form} input[name="WS_delMsgDisplayed"]`).val();
                                    var transactionId = $(`${form} input[name="transactionId"]`).val();

                                    var src_curr_bal = $('span[id="disabled_SRC.CURR.BAL"]').text();

                                    var param = {
                                      url: techcombank_page + 'BrowserServlet',
                                      headers: {
                                        Cookie: cookie,
                                        'Referer': 'https://ib.techcombank.com.vn/servlet/BrowserServlet',
                                      },
                                      form: {
                                        formToken: formToken,
                                        toggle: toggle,
                                        command: command,
                                        requestType: 'OFS.APPLICATION',
                                        ofsOperation: 'PROCESS',
                                        ofsFunction: 'I',
                                        ofsMessage: ofsMessage,
                                        GTSControl: GTSControl,
                                        routineName: routineName,
                                        routineArgs: '',
                                        cfNavOperation: cfNavOperation,
                                        unlock: unlock,
                                        activeTab: activeTab,
                                        SaveChangesText: SaveChangesText,
                                        RecordDelText: RecordDelText,
                                        expansionHistory: expansionHistory,
                                        version: version,
                                        application: application,
                                        enableDealSlip: enableDealSlip,
                                        decrypt: decrypt,
                                        addGroupTab: addGroupTab,
                                        deleteGroupTab: deleteGroupTab,
                                        expandableTab: expandableTab,
                                        tabEnri: tabEnri,
                                        product: product,
                                        name: "",
                                        operation: operation,
                                        windowName: main.id,
                                        toolbarTarget: toolbarTarget,
                                        overridesAccepted: 'YES',
                                        overridesApproved: overridesApproved,
                                        focus: focus,
                                        ContractStatus: ContractStatus,
                                        windowUnqRef: windowUnqRef,
                                        editVersion: editVersion,
                                        confirmVersion: confirmVersion,
                                        previewVersion: previewVersion,
                                        enqname: enqname,
                                        enqaction: enqaction,
                                        dropfield: dropfield,
                                        previousEnqs: previousEnqs,
                                        previousEnqTitles: previousEnqTitles,
                                        clientStyleSheet: clientStyleSheet,
                                        windowSizes: windowSizes,
                                        changedFields: '',
                                        newCommands: newCommands,
                                        screenMode: screenMode,
                                        lockArgs: lockArgs,
                                        RecordRead: RecordRead,
                                        PastedDeal: PastedDeal,
                                        allowResize: allowResize,
                                        companyId: companyId,
                                        company: company,
                                        user: user_name,
                                        transSign: transSign,
                                        skin: skin,
                                        today: today,
                                        release: release,
                                        compScreen: compScreen,
                                        reqTabid: reqTabid,
                                        compTargets: compTargets,
                                        EnqParentWindow: EnqParentWindow,
                                        timing: timing,
                                        pwprocessid: pwprocessid,
                                        language: language,
                                        languages: languages,
                                        savechanges: savechanges,
                                        staticId: staticId,
                                        lockDateTime: lockDateTime,
                                        popupDropDown: popupDropDown,
                                        allowcalendar: allowcalendar,
                                        allowdropdowns: allowdropdowns,
                                        allowcontext: allowcontext,
                                        nextStage: nextStage,
                                        maximize: maximize,
                                        showStatusInfo: showStatusInfo,
                                        languageUndefined: languageUndefined,
                                        expandMultiString: expandMultiString,
                                        deleteMultiString: deleteMultiString,
                                        expandSubString: expandSubString,
                                        clientExpansion: clientExpansion,
                                        WS_parentWindow: WS_parentWindow,
                                        WS_parent: WS_parent,
                                        WS_dropfield: WS_dropfield,
                                        WS_doResize: WS_doResize,
                                        WS_initState: WS_initState,
                                        WS_PauseTime: WS_PauseTime,
                                        WS_multiPane: WS_multiPane,
                                        WS_replaceAll: WS_replaceAll,
                                        WS_parentComposite: WS_parentComposite,
                                        WS_delMsgDisplayed: WS_delMsgDisplayed,
                                        'overrideText:Quy khach bam "Thuc hien" de xac nhan giao dich:value': 'YES',
                                        transactionId: transactionId,
                                        'fieldName:DEBIT.ACCT.NO': senderId,
                                        'fieldName:SRC.ACCT.NAME': 'TIEN GUI THANH TOAN',
                                        'fieldName:SRC.CURR.BAL': src_curr_bal,
                                        'fieldName:CREDIT.ACCT.NO': receiverId,
                                        'fieldName:TAR.ACCT.NAME': receiverName,
                                        'fieldName:PAYMENT.DETAILS:1': 'TECHCOMBANK',
                                        'fieldName:DEBIT.AMOUNT': sotien,
                                        'fieldName:DEBIT.CURRENCY': 'VND',
                                        'fieldName:PROCESSING.DATE': today,
                                        'fieldName:CREDIT.THEIR.REF': '',
                                        'fieldName:PAY.DETAILS': details,
                                        'fieldName:LOCAL.CHARGE.AMT': '1,100',
                                        'overridesPresent': 'YES',
                                        WS_FragmentName: main.id
                                      }
                                    };

                                    request.post(param, (err, res, body)=> {
                                      if (err) {

                                      } else {
                                        var location = res.headers['location'];
                                        var param = {
                                          url: location,
                                          headers: {
                                            Referer: 'https://ib.techcombank.com.vn/servlet/BrowserServlet',
                                            Cookie: cookie,
                                          }
                                        }
                                        request.get(param, (err, res, body)=> {
                                          if (err) {

                                          } else {
                                            var $ = cheerio.load(res.body);
                                            var formToken = $('input[name="formToken"]').eq(1).val();
                                            var rsa_userid = $('input[name="rsa_userid"]').val();
                                            var requestType = $('input[name="requestType"]').val();
                                            var command = $('input[name="command"]').val();
                                            var application = $('input[name="application"]').val();
                                            var version = $('input[name="version"]').val();
                                            var step = $('input[name="step"]').val();
                                            var param = {
                                              url: techcombank_page + 'BrowserServlet',
                                              headers: {
                                                Cookie: cookie,
                                              },
                                              form: {
                                                formToken: formToken,
                                                rsa_userid: rsa_userid,
                                                userPin: password,
                                                tokenCode: '12345678',
                                                rsa_passcode: password + '12345678',
                                                requestType: requestType,
                                                command: command,
                                                application: application,
                                                version: version,
                                                step: step

                                              }
                                            };
                                            request.post(param, (e, r, b) => {
                                              console.log(r.headers);
                                            })
                                          }
                                        })
                                      }
                                    })


                                  }
                                })

                              }
                            })

                          }
                        })
                      }
                    });

                  }

                })

              }
            })

          }
        });


        fulfill(res)
      }
    })
  })
};


getLoginPage()
  .then((res)=> {
    return login();
  })
  //.then((res)=> {
  //  return transfer();
  //})
  .then((res)=> {
    fs.writeFile('abc.html', res.body);
  })
  .catch((err)=> {
    console.error(err);
  });