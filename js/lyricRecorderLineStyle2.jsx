
{
    var lyricRecorderLineStyle2 =
        {
            drawLine: function( currentComp, line, lineNumber, camera, lastWordOfLastLineEndTime, wordPosition ) {


                var word;
                var words = "";

                var spaceWidth = 40;
                var lineHeight = 80;

                var cursorPositionX = 0;
                var cursorPositionY = 0;
                var cursorPositionZ = -80;

                var cursorStartPositionX = 50;
                var cursorStartPositionY = lineHeight + 850;

                var numberWords = line.words.length;
                var totalWordWidth = 0;

                var compWidth = currentComp.width;
                var compHeight = currentComp.height;

                var numberLines = 4;

                var wordsObjects = [];

                camera.property( "Position" ).setValueAtTime( 0, [compWidth / 2, compHeight / 2, -2700] );


                var alexTextLayer;
                var alexTextLayer1;
                // First loop

                var boxesVerticalPosition = 0;
                var boxesHeight = 100;

 
  var boxesVerticalPosition1 = 200;
                    var wordsVerticalPosition1 = 185;
                   
                    
                for ( var i = 0; i < line.words.length; i++ ) {
                    word = line.words[i];

                    alexTextLayer = currentComp.layers.addText( lyricRecorderLineStyleUtilities.removePunctuation( word.word ) );
                    alexTextLayer.name = "alexTextLayer_" + lineNumber + "_" + i + "_" + word.word;
                    lyricRecorderLineStyleUtilities.setFont( alexTextLayer );
                    word.wordWidth = alexTextLayer.sourceRectAtTime( 0, false ).width;
                    word.wordHeight = alexTextLayer.sourceRectAtTime( 0, false ).height;
                    totalWordWidth += word.wordWidth;
                    word.afterEffectsTextLayer2 = alexTextLayer;

                    //   alexTextLayer1= alexTextLayer.duplicate();
                    //       word.afterEffectsTextLayer1 = alexTextLayer1;

                    //    alexTextLayer2= alexTextLayer.duplicate();
                    //     word.afterEffectsTextLayer2 = alexTextLayer2;

                    mySourceText = alexTextLayer.property( "ADBE Text Properties" ).property( "ADBE Text Document" );
                    var myTextDoc = mySourceText.value;
                    var myTextDoc1 = mySourceText.value;
                    myTextDoc.fillColor = lyricRecorderLineStyleUtilities.hexToColor( "FFFFFF" );
                    myTextDoc1.fillColor = lyricRecorderLineStyleUtilities.hexToColor( "91FC03" );
                    mySourceText.setValueAtTime( 0, myTextDoc );
                    mySourceText.setValueAtTime( 8, myTextDoc1 );
                    var waveStrokeColour = "FFFFFF";
                    var waveStrokeFill = "FFFFFF";
                    var waveStrokeFillSelected = "0AE62E";
                    var waveStrokeWidth = 0;



                    batman6 = currentComp.layers.addShape();
                    batman6.name = "box_" + lineNumber + "_" + i + "_" + word.word;
                    batman6.property( "ADBE Root Vectors Group" ).addProperty( "ADBE Vector Group" );
                    batman6.property( "ADBE Root Vectors Group" ).property( 1 ).name = "Group 1";
                    batman6.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).addProperty( "ADBE Vector Shape - Group" );
                    batman6.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).addProperty( "ADBE Vector Graphic - Stroke" );
                    batman6.content( "Group 1" ).content( "Stroke 1" ).color.setValue( lyricRecorderLineStyleUtilities.hexToColor( "333333" ) );
                    batman6.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).addProperty( "ADBE Vector Graphic - Fill" );
                    batman6.content( "Group 1" ).content( "Fill 1" ).color.setValue( lyricRecorderLineStyleUtilities.hexToColor(  "333333"  ) );
                    batman6.content( "Group 1" ).content( "Stroke 1" ).strokeWidth.setValue( waveStrokeWidth );
                    batman6.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).property( 1 ).name = "Path 1";
                    batmanPath6 = batman6.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).property( 1 ).property( "ADBE Vector Shape" );
                    batmanPath_newShape6 = new Shape();
                    batmanPath_newShape6.vertices = [[100, boxesVerticalPosition], [500, boxesVerticalPosition], [500, boxesVerticalPosition - boxesHeight], [100, boxesVerticalPosition - boxesHeight]];
                    batmanPath_newShape6.inTangents = [[0, 0], [0, 0], [0, 0], [0, 0]];
                    batmanPath_newShape6.outTangents = [[0, 0], [0, 0], [0, 0], [0, 0]];
                    batmanPath_newShape6.closed = true;
                    batmanPath6.setValue( batmanPath_newShape6 );

                    word.afterEffectsBox = batman6;


                }
             

                var maxLineHeight = 0;
                var boxWidth;
  $.writeln( "first word" + line.words[0].word );
            $.writeln( "line.startTime" + line.startTime );
             $.writeln( "lwordPosition" + wordPosition );
             $.writeln( "lastWordOfLastLineEndTime" + lastWordOfLastLineEndTime );
             
               if (line.startTime>lastWordOfLastLineEndTime)
               {
                   
                    $.writeln("Resetting Line" );
                        wordPosition=0;
                        boxesVerticalPosition1 = 200;
                        wordsVerticalPosition1 = 185;
              }
          else
          {
                boxesVerticalPosition1 = 200 + (wordPosition*110);
                        wordsVerticalPosition1 = 185 + (wordPosition*110);
              }
          
                for ( var i = 0; i < line.words.length; i++ ) {
                    word = line.words[i];
                    
if((word.endTime + ((word.wordWidth+300)/3))>lastWordOfLastLineEndTime)
{
                    lastWordOfLastLineEndTime=word.endTime + ((word.wordWidth+300)/3);
  }             
                    var expression = "startTime=" + word.startTime / 1000 + ";endTime=" + word.startTime / 1000 + ";positionX=100; positionY=" + boxesVerticalPosition1 + ";positionX=260-((time-startTime)*300);[positionX,positionY];";
                    var expression1 = "startTime=" + word.startTime / 1000 + ";endTime=" + word.startTime / 1000 + ";positionX=100; positionY=" + wordsVerticalPosition1 + ";positionX=(260-((time-startTime)*300))+10;[positionX,positionY];";

                    if ( wordPosition != 0 && wordPosition % 5 == 0 ) {
                        boxesVerticalPosition1 = 200;
                        wordsVerticalPosition1 = 185;
                        wordPosition=0;
                    }
                    else {
                        boxesVerticalPosition1 += 110;
                        wordsVerticalPosition1 += 110;
                          wordPosition++;
                    }
              

                    boxWidth = ( ( word.endTime ) - ( word.startTime ) ) * 0.3;

                    word.afterEffectsBox.transform.position.expression = expression;
                     word.afterEffectsBox.moveToBeginning();
                    word.afterEffectsTextLayer2.transform.position.expression = expression1;
                    word.afterEffectsTextLayer2.moveToBeginning();
                    batmanPath6 = word.afterEffectsBox.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).property( 1 ).property( "ADBE Vector Shape" );
                    batmanPath_newShape6 = new Shape();
                    batmanPath_newShape6.vertices = [[0, boxesVerticalPosition], [boxWidth, boxesVerticalPosition], [boxWidth, boxesVerticalPosition - boxesHeight], [0, boxesVerticalPosition - boxesHeight]];
                    batmanPath_newShape6.inTangents = [[0, 0], [0, 0], [0, 0], [0, 0]];
                    batmanPath_newShape6.outTangents = [[0, 0], [0, 0], [0, 0], [0, 0]];
                    batmanPath_newShape6.closed = true;
                    batmanPath6.setValue( batmanPath_newShape6 );
                    
                  
                
                }
            return [lastWordOfLastLineEndTime, wordPosition];
            }
        }
}
















//   appearTime=(word.startTime / 1000);
//    disappearTime= (word.endTime / 1000) ;
//  word.afterEffectsBox.property( "Position" ).setValueAtTime( appearTime, [260, boxesVerticalPosition, cursorPositionZ] );
//    word.afterEffectsBox.property( "Position" ).setValueAtTime( disappearTime, [0, boxesVerticalPosition, cursorPositionZ] );
//var myCommandId = app.findMenuCommandId("Create Masks from Text");
// app.executeCommand(myCommandId);
// camera.property( "Position" ).setValueAtTime( line.endTime / 1000, [1500, compHeight / 2.7, -4000] );   
// word.afterEffectsTextLayer.property( "Position" ).setValueAtTime( word.endTime / 1000, [positionX, positionY, cursorPositionZ] );
//camera.tansform.PointofInterest.setValueAtTime( line.endTime / 1000, [1500, compHeight / 2.7, -4000] );   
//cursorPositionY+=word.wordHeight;
//  camera.property( "Position" ).setValueAtTime( line.startTime / 1000, [-500, compHeight / 2.1, -4000] );
//Make the camera move
// camera.property("Position").setValueAtTime(0,[compWidth/2,compHeight/2,-4000])      
    /*
                                      if ( ( cursorPositionX + spaceWidth + word.wordWidth ) >= ( compWidth - cursorStartPositionX ) ) {
                                            cursorPositionX = 0;
                                            cursorPositionY += lineHeight;
                                        }
                                    
                                        var positionX = cursorStartPositionX + cursorPositionX;
                                        var positionY = cursorStartPositionY + cursorPositionY;
                                    word.afterEffectsTextLayer.property( "Position" ).setValueAtTime( 0, [positionX, positionY, cursorPositionZ] );
                                     word.afterEffectsTextLayer1.property( "Position" ).setValueAtTime( 0, [positionX, positionY, cursorPositionZ] );
                                        cursorPositionX += word.wordWidth + spaceWidth;
                    */
//var alexPreset = File( 'C:\\Program Files\\Adobe\\Adobe After Effects CC 2019\\Support Files\\Presets\\Text\\Animate In\\Fade Up Words.ffx')