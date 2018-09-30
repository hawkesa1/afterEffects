
{
        var lyricRecorderLineStyle2=
        {
            drawLine:function(currentComp, line, camera, light)
           
            {
                
                
                
                
                var word;
                var words="";
                
                var cursorPositionX=0;
                var cursorPositionY=0;
                var cursorPositionZ=-80;
                
                var cursorStartPositionX=200;
                var cursorStartPositionY=200;
                var spaceWidth=60;
                var lineHeight=250;

                var numberWords=line.words.length;
                var totalWordWidth=0;    
                
                var compWidth=currentComp.width;
                var compHeight= currentComp.height;
                
                var numberLines=4;                
                
                $.writeln (compWidth+" "+compHeight)
                
                

camera.property("Position").setValueAtTime(0,[compWidth/2,compHeight/2,-4000])                
              
                // First loop
                 for (var i=0; i<line.words.length; i++)
                {        
                    word=line .words[i];
                    var textLayer=currentComp.layers.addText(lyricRecorderLineStyleUtilities.removePunctuation(word.word).toUpperCase());
                    textLayer.threeDLayer=true;
                    textLayer.castsShadows.setValue(1);
                    lyricRecorderLineStyleUtilities.setFont(textLayer);        
                    word.wordWidth=textLayer.sourceRectAtTime(0,false).width;
                    word.wordHeight=textLayer.sourceRectAtTime(0,false).height; 
                    totalWordWidth+=word.wordWidth;       
                    word.afterEffectsTextLayer=textLayer;
                }
                $.writeln("Toatal Word Width:" + totalWordWidth);
                 
                var maxLineHeight=0;

                 for (var i=0; i<line.words.length; i++)
                {        
                   word=line .words[i];
                   word.afterEffectsTextLayer.startTime=word.startTime/1000;
                   word.afterEffectsTextLayer.outPoint=line.endTime/1000 ;                   
                    
                    
                    if((cursorPositionX + spaceWidth + word.wordWidth)>=(compWidth-cursorStartPositionX))
                    {
                            cursorPositionX=0;
                            cursorPositionY+=lineHeight;
                    }                    
                    
                    var positionX=cursorStartPositionX+cursorPositionX;
                    var positionY=cursorStartPositionY+cursorPositionY;
                   
                    word.afterEffectsTextLayer.property("Position").setValueAtTime(word.startTime/1000,[positionX,positionY,cursorPositionZ]);
                    word.afterEffectsTextLayer.property("Position").setValueAtTime(word.endTime/1000,[positionX,positionY,cursorPositionZ]); 
                
                    cursorPositionX+=word.wordWidth+spaceWidth;
                    
                  
                    //cursorPositionY+=word.wordHeight;
                        
                }
            
                
            
            }
        }
}