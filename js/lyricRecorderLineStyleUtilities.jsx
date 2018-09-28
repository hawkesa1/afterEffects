{
 var lyricRecorderLineStyleUtilities=
        {
              removePunctuation:function(originalString)
                {
                    var punctuationless = originalString.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                    var finalString = punctuationless.replace(/\s{2,}/g," ");
                    return finalString;
                },

                 setPositionAndScale:function(word,wordXPosition,wordYPosition,scalingXAmount,scalingYAmount)
                {
                        word.afterEffectsTextLayer.property("Position").setValueAtTime(word.startTime/1000,[wordXPosition,wordYPosition]);
                        word.afterEffectsTextLayer.property("Position").setValueAtTime(word.endTime/1000 ,[wordXPosition,wordYPosition]); 
                        word.afterEffectsTextLayer.property("Scale").setValueAtTime(word.startTime/1000,[100*scalingXAmount,100*scalingYAmount]);
                        word.afterEffectsTextLayer.property("Scale").setValueAtTime(word.endTime/1000 ,[100 * scalingXAmount, 100*scalingYAmount]); 
                },

            setFont:function(textLayer)
            {
                        textProperty = textLayer.property("Source Text");
                        textPropertyValue = textProperty.value;
                        textPropertyValue.resetCharStyle();
                        textPropertyValue.fontSize = 100;
                        textPropertyValue.fillColor = [1, 1, 1];
                        textPropertyValue.font = "SavingsBond";
                        textProperty.setValue(textPropertyValue);          
            }
       }  
}