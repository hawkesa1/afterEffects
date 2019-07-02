
{
    var lyricRecorderLineStyle2 =
        {
            drawLine: function(currentComp, line, lineNumber, camera, light ) {


                var alexPreset = File('C:\\Program Files\\Adobe\\Adobe After Effects CC 2019\\Support Files\\Presets\\Text\\Animate In\\Fade Up Words.ffx')

                var word;
                var words = "";

                var cursorPositionX = 0;
                var cursorPositionY = 0;
                var cursorPositionZ = -80;

                var cursorStartPositionX = 200;
                var cursorStartPositionY = 200;
                var spaceWidth = 60;
                var lineHeight = 250;

                var numberWords = line.words.length;
                var totalWordWidth = 0;

                var compWidth = currentComp.width;
                var compHeight = currentComp.height;

                var numberLines = 4;

                $.writeln( compWidth + " " + compHeight )



                //Make the camera move
                // camera.property("Position").setValueAtTime(0,[compWidth/2,compHeight/2,-4000])                
                camera.property( "Position" ).setValueAtTime( 0, [compWidth / 2, compHeight / 2, -4000] );
              //  camera.property( "Position" ).setValueAtTime( line.startTime / 1000, [-500, compHeight / 2.1, -4000] );
               




                // First loop
                for ( var i = 0; i < line.words.length; i++ ) {
                    word = line.words[i];
                    var alexTextLayer = currentComp.layers.addText( lyricRecorderLineStyleUtilities.removePunctuation( word.word ).toUpperCase() );
                    alexTextLayer.name="alexTextLayer_"+lineNumber+"_"+i+"_"+word.word;
                    alexTextLayer.threeDLayer = true;
                    alexTextLayer.castsShadows.setValue( 1 );
                    lyricRecorderLineStyleUtilities.setFont( alexTextLayer );
                    word.wordWidth = alexTextLayer.sourceRectAtTime( 0, false ).width;
                    word.wordHeight = alexTextLayer.sourceRectAtTime( 0, false ).height;
                    totalWordWidth += word.wordWidth;
                    word.afterEffectsTextLayer = alexTextLayer;
                    
                  
                  alexTextLayer.applyPreset(alexPreset);

                }
                $.writeln( "Toatal Word Width:" + totalWordWidth );

                var maxLineHeight = 0;

                for ( var i = 0; i < line.words.length; i++ ) {
                    word = line.words[i];
                    word.afterEffectsTextLayer.startTime = word.startTime / 1000;
                    word.afterEffectsTextLayer.outPoint = line.endTime / 1000;
                    if ( ( cursorPositionX + spaceWidth + word.wordWidth ) >= ( compWidth - cursorStartPositionX ) ) {
                        cursorPositionX = 0;
                        cursorPositionY += lineHeight;
                    }
                    var positionX = cursorStartPositionX + cursorPositionX;
                    var positionY = cursorStartPositionY + cursorPositionY;
                    word.afterEffectsTextLayer.property( "Position" ).setValueAtTime( word.startTime / 1000, [positionX, positionY, cursorPositionZ] );
                    word.afterEffectsTextLayer.property( "Position" ).setValueAtTime( word.endTime / 1000, [positionX, positionY, cursorPositionZ] );
                    cursorPositionX += word.wordWidth + spaceWidth;
                    //cursorPositionY+=word.wordHeight;
                    
                   

                   alexTextLayer.property("Text").property("Animators").property("Animator 1").selector("Range Selector 1").property("Start").setValueAtTime(word.startTime / 1000,0);
                    alexTextLayer.property("Text").property("Animators").property("Animator 1").selector("Range Selector 1").property("Start").setValueAtTime(word.endTime / 1000,0);
                    // alexTextLayer.Text.Animators.property("Animator 1").selector("Range Selector 1").property("Endo").setValueAtTime(word.endTime / 1000,0);                    
                    
                   //  $.writeln(  app.project.activeItem.selectedLayers[0].property("ADBE Text Animator").properties[0] )
                
                camera.property( "Position" ).setValueAtTime( line.endTime / 1000, [1500, compHeight / 2.7, -4000] );      
                    //camera.tansform.PointofInterest.setValueAtTime( line.endTime / 1000, [1500, compHeight / 2.7, -4000] );   
                }
            
              
            }
        
            

   
        }
 
    
}



