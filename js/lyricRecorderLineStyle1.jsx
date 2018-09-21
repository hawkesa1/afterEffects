
{
        var lyricRecorderLineStyle1=
        {
            drawLine:function(currentComp, line)
            {
                 var word;
                 for (var j=0; j<line.words.length; j++)
                {        
                    word=line .words[j];
                    var textLayer=currentComp.layers.addText(lyricRecorderLineStyleUtilities.removePunctuation(word.word).toUpperCase());
                    lyricRecorderLineStyleUtilities.setFont(textLayer);        
                    word.afterEffectsTextLayer=textLayer;
                    word.afterEffectsTextLayer.startTime=word.startTime/1000;
                    word.afterEffectsTextLayer.outPoint=word.endTime/1000 ;
                    var wordWidth=word.afterEffectsTextLayer.sourceRectAtTime(0,false).width;
                    var wordHeight=word.afterEffectsTextLayer.sourceRectAtTime(0,false).height; 
                }
            }
        }
}