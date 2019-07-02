
{
    var lyricRecorderLineStyle2 =
        {
            drawLine: function(currentComp, line, camera, light ) {


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
                    alexTextLayer.threeDLayer = true;
                    alexTextLayer.castsShadows.setValue( 1 );
                    lyricRecorderLineStyleUtilities.setFont( alexTextLayer );
                    word.wordWidth = alexTextLayer.sourceRectAtTime( 0, false ).width;
                    word.wordHeight = alexTextLayer.sourceRectAtTime( 0, false ).height;
                    totalWordWidth += word.wordWidth;
                    word.afterEffectsTextLayer = alexTextLayer;
                    
                    alexPreset.length=100000;
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
                    
                   //  $.writeln(  app.project.activeItem.selectedLayers[0].property("ADBE Text Animator").properties[0] )
                   scanPropGroupProperties(alexTextLayer);
                camera.property( "Position" ).setValueAtTime( line.endTime / 1000, [1500, compHeight / 2.7, -4000] );      
                    //camera.tansform.PointofInterest.setValueAtTime( line.endTime / 1000, [1500, compHeight / 2.7, -4000] );   
                }
            }
        }
}


function scanPropGroupProperties(propGroup)
{
    
 $.writeln( "scanPropGroupProperties:" + propGroup.name );    
    var i, prop;

    // Iterate over the specified property group's properties
    for (i=1; i<=propGroup.numProperties; i++)
    {
        prop = propGroup.property(i);
        if (prop.propertyType === PropertyType.PROPERTY)    // Found a property
        {
            
             $.writeln( "Prop:" + prop.name  + " " +prop.toString());
            // Found a property
            // FYI: layer markers have a prop.matchName = "ADBE Marker"
        }
        else if ((prop.propertyType === PropertyType.INDEXED_GROUP) || (prop.propertyType === PropertyType.NAMED_GROUP))
        {
            // Found an indexed or named group, so check its nested properties
            scanPropGroupProperties(prop);
        }
    }
}
