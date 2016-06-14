'use strict';

/**
 * Created by baohg on 14/06/2016.
 */



handleSubmitButtons=function(params){
  //Find all submit buttons on the page
  var submitButtons = feba.domManipulator.find(feba.domManipulator.getElementById(params.groupletDivId),Constants.COLON+Constants.SUBMIT);
  //Loop through all the submit buttons
  for(i=0;i<submitButtons.length;i++){
    //For each submit button
    var submitButton = feba.domManipulator.getElement(submitButtons[i]);
    feba.domManipulator.setAttribute(submitButton,"data-dontBlockUI",Constants.TRUE);
    //Check if the button should be excluded from RIA. If yes, don't associate any function to the button
    if(isExcluded(feba.domManipulator.getAttribute(submitButton,Constants.ID),false,params.exclusionIds,null,null)){
      continue;
    }

    //Otherwise, associate the following anonymous function to the click event
    feba.domManipulator.click(submitButton,function(event){
      feba.domManipulator.blockUI({ message:'<h1><img src="L001/consumer/images/widget-loading.gif"/></h1>',baseZ: 1000,css: {top: '0px', left: '0px', height: jQuery(window).height(),width: jQuery(window).width(),opacity: 0.5, background: 'Black'}});
      //If a request for this widget is already in progress, abort and return
      if(feba.features[params.groupletJsVarName].options.isRequestInProcess){
        event.stopImmediatePropagation();
        feba.domManipulator.preventDefault(event);
        return;
      }

      //Get all the elements on the widget
      var divElements = feba.domManipulator.children(feba.domManipulator.getElementById(params.groupletDivId));
      //Get all the input elements on the widget
      var inputElements = feba.domManipulator.getIdWithAppend(params.groupletDivId," *:input");

      //Get all the input elements of type text in a widget
      var textElements = feba.domManipulator.getIdWithAppend(params.groupletDivId," *:input[type='text']");

      //clear all the watermarks of text box in grouplet
      feba.js.watermark.clearWatermark(textElements);

      //Create a form
      var frm = feba.domManipulator.getElement("<form></form>");
      //Make it invisible
      feba.domManipulator.css(frm,"display", "none");
      //Get the button which was clicked by the user
      var button = feba.domManipulator.getElement(this);
      //Check if it is a download button
      var isDownloadButton = feba.domManipulator.getAttribute( button,"data-isDownloadButton");

      //If it is not an upload
      if(!params.isMultiPartRequest){
        //And it is a download
        if(isDownloadButton===Constants.TRUE){
          //Set a flag in the form indicating that this is a download (will be used by the server)
          feba.domManipulator.setAttribute(frm,"isDownloadAction","true");

          //Clone the contents inside the widget and add them to the form
          cloneAndAppendToForm(divElements,frm);

          //Determine the target which has to be updated with the response
          var target = feba.domManipulator.getElementById(feba.features[params.groupletJsVarName].options.target);

          //If it is a Modal View
          if(feba.features[params.groupletJsVarName].options.tagHelper== "MODAL_VIEW.TagHelper"){
            //The target is the modal view div
            target = feba.domManipulator.getElementById("modalDialog") ;
          }
          //If it is a calendar
          if(feba.features[params.groupletJsVarName].options.isCalendar==Constants.TRUE){
            //The target is the calendar div
            target = feba.domManipulator.getElementById("simplemodal-container");
          }
          //Create a new iFrame
          var frameName = "downloaderFrame"+new Date().getTime();
          var jFrame = createFrame(target,frm,frameName);

          //Load the iFrame
          jFrame.load(
            //This function is a callback and will be executed after the response comes back
            function(event){
              var content = window.frames[frameName].document.getElementsByTagName("body")[0];
              var dContent ;
              if(feba.features[params.groupletJsVarName].options.tagHelper== "MODAL_VIEW.TagHelper"){
                dContent = feba.domManipulator.find(feba.domManipulator.getElement(content),"div[id=MODAL_VIEW_CONTAINER]");
              }else{
                dContent = feba.domManipulator.find(feba.domManipulator.getElement(content),"div[id="+target[0].id.toUpperCase()+"]");
              }
              //Remove the iFrame after waiting for 100 milli-seconds
              setTimeout(function(){
                feba.domManipulator.remove(jFrame);
              },100);
              if(dContent.length!=0){
                feba.domManipulator.replaceWith(feba.domManipulator.getIdWithAppend(target[0].id," > div"),dContent);
              }
              feba.domManipulator.setCssProperties(feba.domManipulator.getElementById(target),{
                "backgroundImage" : ""
              });
            }
          );
          //Add hidden fields to the form
          addHiddenFields(this,params,frm);
          //Add form specific attributes
          addFormAttr(frm,frameName,params.formAction);
          //Trigger the submission of the form
          feba.domManipulator.trigger(frm,Constants.SUBMIT);
          //Remove the temporary form
          feba.domManipulator.remove(frm);
        }else{// This is called for regular submits (not downloads)

          // Added for ticket id : 626693 - Start
          var passwordElements ;
          var textElements ;
          var groupletIdEncrypt ;
          var isModalView = false;
          //If it is a calendar or modal view
          if(feba.features[params.groupletJsVarName].options.isCalendar==Constants.TRUE ||
            feba.features[params.groupletJsVarName].options.tagHelper== "MODAL_VIEW.TagHelper" ||
            params.groupletJsVarName=="MODAL_VIEW_CONTAINER"){
            //It is a calendar or modal view so set the grouplet Id as null
            isModalView = true;
            groupletIdEncrypt = null;
          }else{
            groupletIdEncrypt = params.groupletId;
          }
          passwordElements = getSpecifiedElements(groupletIdEncrypt,'input:password');
          textElements = getSpecifiedElements(groupletIdEncrypt,'input:[encryptionRequired=true]');
          for(var count=0;count<textElements.length;count++) {
            passwordElements.push(textElements[count])
          }
          if(passwordElements.length){
            disableButton(feba.domManipulator.getAttribute(button,"id"),params.groupletId);
            //Encrypt all the password fields
            encryptValues(groupletIdEncrypt, false, isModalView);
          }
          // Added for ticket id : 626693 - End

          /* Checking whether there is a password element on the grouplet
           var passwordElements = getSpecifiedElements(params.groupletId,':password');
           //If there are password elements
           if(passwordElements.length){
           //Disable the buttons on the widget
           disableButton(feba.domManipulator.getAttribute(button,"id"),params.groupletId);
           //Encrypt all the password fields
           encryptValues(params.groupletId);
           }*/

          //configure the form action as the Base URL
          //abhishek_pidwa
          //feba.features[params.groupletJsVarName].options.baseUrl=params.formAction;
          var resourceURL= feba.features[params.groupletJsVarName].options.resourceURL;

          if(resourceURL!=null){
            feba.features[params.groupletJsVarName].options.baseUrl=feba.features[params.groupletJsVarName].options.resourceURL;
          }
          else{
            feba.features[params.groupletJsVarName].options.baseUrl=params.formAction;
          }
          //Serialize the contents (input elements) of the widget
          var serializedString = feba.domManipulator.serialize(inputElements).replace(/\+/g," ");
          //Remove all div elements
          //feba.domManipulator.remove(divElements);

          //Create a grouplet parameters object containing the serialized String and other common fields
          feba.features[params.groupletJsVarName].options.groupletParameters=serializedString
            +"&"+feba.domManipulator.getAttribute(feba.domManipulator.getElement(this),Constants.NAME)+
            "="+feba.domManipulator.getAttribute(feba.domManipulator.getElement(this),Constants.VALUE)+
            "&"+params.groupletNameConst+"="+params.groupletId+"&"+params.riaRequestTypeConst+"="+params.riaType+"&GROUPLETS_IN_PAGE="+_GROUPLETS_IN_PAGE_;


          //If there is any IGC configured for a button click
          feba.features[params.groupletJsVarName].options.actionElement=getElementName(event);
          //invoke the target
          feba.features[params.groupletJsVarName].execute();
        }
      }else if(params.isMultiPartRequest){//If this is an upload button
        //Append the form to the existing elements on the widget
        divElements.appendTo(frm);
        //Get the target
        var targetElementId = feba.features[params.groupletJsVarName].options.target;
        var target = feba.domManipulator.getElementById(targetElementId);
        //Paint the loading image
        feba.domManipulator.setCssProperties(target,{
          backgroundImage : "url("+feba.features[params.groupletJsVarName].options.loadingImage+")",
          backgroundRepeat : "no-repeat",
          backgroundPosition : "center"
        });

        //Create an iFrame
        var frameName = "uploaderFrame"+new Date().getTime();
        var jFrame = createFrame(target,frm,frameName);
        jFrame.load(
          //Callback function which will be invoked on response
          function(event){
            var content = window.frames[frameName].document.getElementsByTagName("body")[0];
            var dContent = feba.domManipulator.find(feba.domManipulator.getElement(content),'div[id="'+targetElementId.toUpperCase()+'"]');
            setTimeout(function(){
              feba.domManipulator.remove(jFrame);
            },100);
            //TODO: Has to be moved out of this code. Use feba.domManipulator instead
            var isJqueryObj = dContent instanceof jQuery;
            var columnDiv = feba.domManipulator.getIdWithAppend(targetElementId," > div");
            if(isJqueryObj){
              columnDiv.children().remove();
              try{
                columnDiv.html(dContent);
              }catch(e){
                columnDiv.html(dContent.parent().html());
              }
            } else {
              feba.domManipulator.replaceWith(column1Div.children(),dContent);
            }

            feba.domManipulator.setCssProperties(target,{
              "backgroundImage" : ""
            });
            feba.features[params.groupletJsVarName].options.requestId+=1;
          }
        );
        //Add hidden fields
        addHiddenFields(this,params,frm);
        //Add form specific attributes
        addFormAttr(frm,frameName,params.formAction);
        //Set flags indicating that this is an upload
        feba.domManipulator.setAttribute(frm,Constants.ENCTYPE,Constants.MULTIPART);
        feba.domManipulator.setAttribute(frm,'encoding','multipart/form-data');
        //Submit the form
        feba.domManipulator.trigger(frm,Constants.SUBMIT);
        //Remove the form
        feba.domManipulator.remove(frm);
      }
      //Ensure the click event is not propagated upwards to the browser
      event.stopImmediatePropagation();
      feba.domManipulator.preventDefault(event);
    });
  }
};