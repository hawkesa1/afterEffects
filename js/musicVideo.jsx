﻿{
    #include "json2.js" // jshint ignore:line    
    #include "lyricRecorderLineStyle1.jsx" // jshint ignore:line    
    #include "lyricRecorderLineStyle2.jsx" // jshint ignore:line   
    #include "lyricRecorderLineStyleUtilities.jsx" // jshint ignore:line  
    
    // Resource Locations
    
    var TRACK_ARTIST="Eminem";
    var TRACK_TITLE="Lose Yourself";

    
    var ROOT_FOLDER= "C:\\alex\\development\\afterEffects\\afterEffectsProject\\"   
    var RESOURCES_FOLDER=ROOT_FOLDER + "resources\\loseAgain\\";
    var AUDIO_LOCATION =RESOURCES_FOLDER+"audio\\audio.mp3";
    var LYRIC_LOCATION = RESOURCES_FOLDER+"\\lyricData\\LyricRecorder.js";
    var EXPRESSION_SCRIPT = ROOT_FOLDER+"js\\expression1.jsx"

    // Composition Configuration
    var COMP_NAME = "Music Video Composition";
    var COMP_WIDTH = 1920;
    var COMP_HEIGHT = 1080;
    var COMP_PIXEL_ASPECT = 1;
    var COMP_DURATION = 40; //Test Value
    var COMP_FRAME_RATE = 60;
    
    //  Debug values for faster load times.  Set to 0 for all.
    var WAVEFORM_POINTS_MAX=0;
    var LINES_MAX=0;

    app.beginUndoGroup( "Create Music Video" );

    var lyricRecorderAE = {
    createComposition: function( audioFileLocation, lyricsFileLocation ) {
            
    // Creating a Project 
    var currentProject = app.newProject();            
    var mp3File = currentProject.importFile(new ImportOptions(File( audioFileLocation)));     
    var compDuration=mp3File.duration;
//var compDuration=COMP_DURATION;    
    var INTRO_LENGTH=5;
             
    //Create the Composition to hold Intro + Music Video
    var fullVideoComp = currentProject.items.addComp( "Full Video Composition", COMP_WIDTH, COMP_HEIGHT, COMP_PIXEL_ASPECT, compDuration+INTRO_LENGTH, COMP_FRAME_RATE );
   
        
            // Create the Music Video Composition
            var lyricJsonObject = lyricRecorderAE.readLyricDataFromFile( lyricsFileLocation );
            var lines = lyricJsonObject.lyricRecorderSynchronisedLyrics;
            var coordinatesString = lyricJsonObject.coordinates;
            var coordinatesArray = coordinatesString.split( '|' );
            var currentComp = currentProject.items.addComp( COMP_NAME, COMP_WIDTH, COMP_HEIGHT, COMP_PIXEL_ASPECT, compDuration, COMP_FRAME_RATE );
            currentComp.layers.add( mp3File );
           var camera = currentComp.layers.addCamera( "alexCamera1", [0, 0] );
            //  var light = currentComp.layers.addLight( "alexLight1", [currentComp.width / 2, currentComp.height / 2] );
            // light.castsShadows.setValue( 1 );
            //Add a background
            var backgroundLayer = currentComp.layers.addSolid( lyricRecorderLineStyleUtilities.hexToColor( "000000" ), "Background", COMP_WIDTH, COMP_HEIGHT, COMP_PIXEL_ASPECT );
            backgroundLayer.threeDLayer = false;
         
            lyricRecorderAE.drawWaveForm( currentComp, coordinatesArray, TRACK_ARTIST, TRACK_TITLE);
               lyricRecorderAE.handleLines( lines, currentComp, camera );
        //    app.executeCommand( app.findMenuCommandId( "Convert Audio to Keyframes" ) );
        
        
        
        //Add Intro + Music Video to Full and align after
         //fullVideoComp.layers.add(introComp);
         fullVideoComp.layers.add(currentComp);
      //  var compone = fullVideoComp.layer(2);
        //var comptwo = fullVideoComp.layer(1);
        //comptwo.startTime = compone.outPoint;
         
         fullVideoComp.openInViewer();
        },

        readLyricDataFromFile: function( lyricsFile ) {
            var scriptFile = File( lyricsFile );
            scriptFile.open( 'r' );
            var content = scriptFile.read();
            my_JSON_object = JSON.parse( content );// now evaluate the string from the file
            scriptFile.close();
            return my_JSON_object;
        },
    
        
    
    
    
    
        drawWaveForm: function( currentComp, coordinatesArray, artistText, titleText ) {
            var waveStrokeColour = "FFFFFF";
            var waveStrokeWidth = 1;
            var scriptFile1 = File( EXPRESSION_SCRIPT );
            scriptFile1.open( 'r' );
            var alexScript = scriptFile1.read();
            var batman;
            var batmanPath;
            var batmanPath_newShape;
            var myArray = "var coordinates=[";
            var myArray1 = "var coordinates=[";
            var coo;
            var first = true;
            var coordinatesCounter = 0;          
            var coordinatesToDraw;
            
            // Set a value to draw less for debugging
            if(WAVEFORM_POINTS_MAX==0) {
                coordinateToDraw=   coordinatesArray.length 
               }        
           else
           {
                coordinateToDraw=    WAVEFORM_POINTS_MAX;
            }
           
            for ( var i = 0; i < coordinateToDraw; i++ ) {
                if ( i % 1000 == 0 ) {
                    coordinatesCounter++;
                    myArray += "];\n\n";
                    myArray += "var coordinates_" + coordinatesCounter + "=[";
                    myArray1 += "];\n\n";
                    myArray1 += "var coordinates_" + coordinatesCounter + "=[";
                    first = true;
                }
                coo = coordinatesArray[i].split( ',' );
                if ( first ) {
                    first = false;
                }
                else {
                    myArray += ",";
                    myArray1 += ",";
                }
                myArray += "[" + coo[1] + "]";
                myArray1 += "[" + coo[2] + "]";
            }
            myArray += "];\n\n";
            myArray1 += "];\n\n";
            myArray += "// coordinates need to be split in to arrays of 1000 as AE expression GUI was crashing with long lines \n\n";
            myArray1 += "// coordinates need to be split in to arrays of 1000 as AE expression GUI was crashing with long lines \n\n";
            for ( var i = 0; i < coordinatesCounter; i++ ) {
                var next = i + 1;
                myArray += "coordinates=coordinates.concat(coordinates_" + next + ");\n";
                myArray1 += "coordinates=coordinates.concat(coordinates_" + next + ");\n";
            }
            alexScript1 = myArray + "\n" + alexScript;
            alexScript2 = myArray1 + "\n" + alexScript;
            alexScript3 = myArray + "\n" + "timeo=Math.round(time*100); curVal=coordinates[timeo][0]; yPosition=940+curVal; [260,yPosition]";
            alexScript4 = myArray1 + "\n" + "timeo=Math.round(time*100); curVal=coordinates[timeo][0]; yPosition=940+curVal; [260,yPosition]";
            
            batman = currentComp.layers.addShape();
            batman.name = "Waveform Top Line";
            batman.property( "ADBE Root Vectors Group" ).addProperty( "ADBE Vector Group" );
            batman.property( "ADBE Root Vectors Group" ).property( 1 ).name = "Group 1";
            batman.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).addProperty( "ADBE Vector Shape - Group" );
            batman.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).addProperty( "ADBE Vector Graphic - Stroke" );
            batman.content( "Group 1" ).content( "Stroke 1" ).color.setValue( lyricRecorderLineStyleUtilities.hexToColor( waveStrokeColour ) );
            batman.content( "Group 1" ).content( "Stroke 1" ).strokeWidth.setValue( 2 );
            batman.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).property( 1 ).name = "Path 1";
            batmanPath = batman.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).property( 1 ).property( "ADBE Vector Shape" );
            batmanPath_newShape = new Shape();
            batmanPath_newShape.closed = false;
            batmanPath.setValue( batmanPath_newShape );
           
             $.writeln("Hello: " + alexScript1 );
            batman.property( "Contents" ).property( "Group 1" ).property( "Contents" ).property( "Path 1" ).property( "Path" ).expression = alexScript1;

            batman1 = currentComp.layers.addShape();
            batman1.name = "Waveform Bottom Line";
            batman1.property( "ADBE Root Vectors Group" ).addProperty( "ADBE Vector Group" );
            batman1.property( "ADBE Root Vectors Group" ).property( 1 ).name = "Group 1";
            batman1.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).addProperty( "ADBE Vector Shape - Group" );
            batman1.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).addProperty( "ADBE Vector Graphic - Stroke" );
            batman1.content( "Group 1" ).content( "Stroke 1" ).color.setValue( lyricRecorderLineStyleUtilities.hexToColor( waveStrokeColour ) );
            batman1.content( "Group 1" ).content( "Stroke 1" ).strokeWidth.setValue( 2 );
            batman1.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).property( 1 ).name = "Path 1";
            batmanPath1 = batman1.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).property( 1 ).property( "ADBE Vector Shape" );
            batmanPath_newShape1 = new Shape();
            batmanPath_newShape1.closed = false;
            batmanPath1.setValue( batmanPath_newShape1 );
            batman1.property( "Contents" ).property( "Group 1" ).property( "Contents" ).property( "Path 1" ).property( "Path" ).expression = alexScript2;


            batman2 = currentComp.layers.addShape();
            batman2.name = "Y Axis";
            batman2.property( "ADBE Root Vectors Group" ).addProperty( "ADBE Vector Group" );
            batman2.property( "ADBE Root Vectors Group" ).property( 1 ).name = "Group 1";
            batman2.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).addProperty( "ADBE Vector Shape - Group" );
            batman2.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).addProperty( "ADBE Vector Graphic - Stroke" );
            batman2.content( "Group 1" ).content( "Stroke 1" ).color.setValue( lyricRecorderLineStyleUtilities.hexToColor( "FFFFFF" ) );
            batman2.content( "Group 1" ).content( "Stroke 1" ).strokeWidth.setValue( 1 );
            batman2.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).property( 1 ).name = "Path 1";
            batmanPath2 = batman2.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).property( 1 ).property( "ADBE Vector Shape" );
            batmanPath_newShape2 = new Shape();
            batmanPath_newShape2.vertices = [[-700, -1000], [-700, 1000]];
            batmanPath_newShape2.inTangents = [[0, 0], [0, 0]];
            batmanPath_newShape2.outTangents = [[0, 0], [0, 0]];
            batmanPath_newShape2.closed = false;
            batmanPath2.setValue( batmanPath_newShape2 );





            var batman4 = currentComp.layers.addShape();            
            var BORDER_TOP=300;
            var BORDER_LEFT=500;
           batman4.name = "Intro Box";
           batman4.property( "ADBE Root Vectors Group" ).addProperty( "ADBE Vector Group" );
           batman4.property( "ADBE Root Vectors Group" ).property( 1 ).name = "Group 1";
            batman4.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).addProperty( "ADBE Vector Shape - Group" );
            batman4.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).addProperty( "ADBE Vector Graphic - Stroke" );
           batman4.content( "Group 1" ).content( "Stroke 1" ).color.setValue( lyricRecorderLineStyleUtilities.hexToColor( "FFFFFF" ) );
           batman4.content( "Group 1" ).content( "Stroke 1" ).strokeWidth.setValue( 2 );
           //batman4.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).addProperty( "ADBE Vector Graphic - Fill" );
          // batman4.content( "Group 1" ).content( "Fill 1" ).color.setValue( lyricRecorderLineStyleUtilities.hexToColor( "000000" ) );
           batman4.property( "Transform" ).property( "Opacity" ).setValue( 100 );
            batman4.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).property( 1 ).name = "Path 1";
            batmanPath4 = batman4.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).property( 1 ).property( "ADBE Vector Shape" );
           
            batmanPath_newShape4 = new Shape();
            var leftEdge=(-COMP_WIDTH / 2)+BORDER_LEFT;
            var topEdge=(COMP_HEIGHT / 2)-BORDER_TOP;
            var bottomEdge=(-COMP_HEIGHT / 2)+BORDER_TOP;
            var boxWidth=COMP_WIDTH-(BORDER_LEFT*2);
            batmanPath_newShape4.vertices = [[leftEdge, topEdge], [leftEdge, bottomEdge], [( leftEdge) + boxWidth, bottomEdge], [leftEdge + boxWidth, topEdge]];
           //batmanPath_newShape3.vertices = [[0,0], [0,100], [100,100], [100,0]];
           // batmanPath_newShape3.inTangents = [[0, 0], [0, 0], [0, 0], [0, 0]];
           // batmanPath_newShape3.outTangents = [[0, 0], [0, 0], [0, 0], [0, 0]];
            batmanPath_newShape4.closed = true;
            batmanPath4.setValue( batmanPath_newShape4 );



            var timing1=0;
            var timing2=23;
            var timing3=29.4;   //6.4 secs to clear


            var artist=currentComp.layers.addText(artistText);
             lyricRecorderLineStyleUtilities.setFont(artist);
             var artistCentredPosition=(COMP_WIDTH / 2)-(artist.sourceRectAtTime(0,false).width/2)
             artist.property("Position").setValueAtTime(timing1,[artistCentredPosition,(COMP_HEIGHT / 2)-50]);
               artist.property("Position").setValueAtTime(timing2,[artistCentredPosition,(COMP_HEIGHT / 2)-50]);
             artist.property("Position").setValueAtTime(timing3 ,[artistCentredPosition-COMP_WIDTH,(COMP_HEIGHT / 2)-50]); 
             
             var title=currentComp.layers.addText(titleText);
             lyricRecorderLineStyleUtilities.setFont(title);             
             var titleCentredPosition=(COMP_WIDTH / 2)-(title.sourceRectAtTime(0,false).width/2)
             title.property("Position").setValueAtTime(timing1,[titleCentredPosition,(COMP_HEIGHT / 2)+100]);
              title.property("Position").setValueAtTime(timing2,[titleCentredPosition,(COMP_HEIGHT / 2)+100]);
             title.property("Position").setValueAtTime(timing3 ,[titleCentredPosition-COMP_WIDTH,(COMP_HEIGHT / 2)+100]);   

             batman4.property("Position").setValueAtTime(timing1,[COMP_WIDTH / 2,(COMP_HEIGHT / 2)]);
              batman4.property("Position").setValueAtTime(timing2,[COMP_WIDTH / 2,(COMP_HEIGHT / 2)]);
             batman4.property("Position").setValueAtTime(timing3 ,[-(COMP_WIDTH/2),(COMP_HEIGHT / 2)]);   

            batman3 = currentComp.layers.addShape();
            batman3.name = "Dead Ball Area";
            batman3.property( "ADBE Root Vectors Group" ).addProperty( "ADBE Vector Group" );
            batman3.property( "ADBE Root Vectors Group" ).property( 1 ).name = "Group 1";
            batman3.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).addProperty( "ADBE Vector Shape - Group" );
            batman3.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).addProperty( "ADBE Vector Graphic - Stroke" );
            batman3.content( "Group 1" ).content( "Stroke 1" ).color.setValue( lyricRecorderLineStyleUtilities.hexToColor( "FFFFFF" ) );
            batman3.content( "Group 1" ).content( "Stroke 1" ).strokeWidth.setValue( 0 );
            batman3.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).addProperty( "ADBE Vector Graphic - Fill" );
            batman3.content( "Group 1" ).content( "Fill 1" ).color.setValue( lyricRecorderLineStyleUtilities.hexToColor( "000000" ) );
            batman3.property( "Transform" ).property( "Opacity" ).setValue( 80 );
            //      batman6.content("Group 1").content("Fill 1").color.setValue(lyricRecorderLineStyleUtilities.hexToColor("8536CF" ));    
            batman3.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).property( 1 ).name = "Path 1";
            batmanPath3 = batman3.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).property( 1 ).property( "ADBE Vector Shape" );
            batmanPath_newShape3 = new Shape();
            batmanPath_newShape3.vertices = [[-COMP_WIDTH / 2, COMP_HEIGHT / 2], [-COMP_WIDTH / 2, -COMP_HEIGHT / 2], [( -COMP_WIDTH / 2 ) + 260, -COMP_HEIGHT / 2], [( -COMP_WIDTH / 2 ) + 260, COMP_HEIGHT / 2]];
            batmanPath_newShape3.inTangents = [[0, 0], [0, 0], [0, 0], [0, 0]];
            batmanPath_newShape3.outTangents = [[0, 0], [0, 0], [0, 0], [0, 0]];
            batmanPath_newShape3.closed = false;
            batmanPath3.setValue( batmanPath_newShape3 );

            var shapeLayer = currentComp.layers.addShape();
            shapeLayer.name = "Top Circle";
            var shapeGroup = shapeLayer.property( "Contents" ).addProperty( "ADBE Vector Group" );
            shapeGroup.property( "Contents" ).addProperty( "ADBE Vector Shape - Ellipse" );
            shapeGroup.property( "Contents" ).addProperty( "ADBE Vector Graphic - Stroke" );
            shapeLayer.content( "Group 1" ).content( "Stroke 1" ).strokeWidth.setValue( 0 );
            shapeGroup.content( "Stroke 1" ).color.setValue( lyricRecorderLineStyleUtilities.hexToColor( "FFFFFF" ) );
            shapeGroup.property( "Contents" ).addProperty( "ADBE Vector Graphic - Fill" );
            shapeGroup.content( "Fill 1" ).color.setValue( lyricRecorderLineStyleUtilities.hexToColor( "FFFFFF" ) );
            shapeLayer.content( "Group 1" ).property( "Contents" ).property( "Ellipse Path 1" ).property( "Size" ).setValue( [10, 10] );
            shapeLayer.property( "Transform" ).property( "Position" ).expression = alexScript3; //.setValue( [260,940]);

            shapeLayer2 = shapeLayer.duplicate();
            shapeLayer2.name = "Bottom Circle";
            shapeLayer.property( "Transform" ).property( "Position" ).expression = alexScript4;
            // batman.startTime =coo[0]/100;
            //   batman.outPoint = (coo[0]/100)+.1;
            
            
           
   
              
          
            
            

        },


        handleLines: function( lines, currentComp, camera, light ) {
            
            
            
        
            
            
            
            var lastWordOfLastLineEndTime=-2;
            var wordPosition=0;
            var returnResults;       
            var linesToDraw;
            // Set a value to draw less for debugging
            
            
         




            
            
            
            
            if(LINES_MAX==0) {
                linesToDraw=   lines.length 
            }        
            else{
                linesToDraw=LINES_MAX;
            }          
            for ( var i = 0; i <linesToDraw; i++ ) {
                var line;
                line = lines[i];
                returnResults= lyricRecorderLineStyle2.drawLine( currentComp, line, i, camera, lastWordOfLastLineEndTime , wordPosition);
                lastWordOfLastLineEndTime=returnResults[0];
                wordPosition=returnResults[1];
                for ( var j = 0; j < line.words.length; j++ ) {
                    word = line.words[j];
                    word.afterEffectsTextLayer2.startTime = ( word.startTime / 1000 ) - 8;
                    word.afterEffectsTextLayer2.outPoint = ( word.endTime / 1000 ) + 8;
                    word.afterEffectsBox.startTime = ( word.startTime / 1000 ) - 8;
                    word.afterEffectsBox.outPoint = ( word.endTime / 1000 ) + 8;
                    
                    // shapeLayer3.content( "Group 1" ).property( "Contents" ).property( "Ellipse Path 1" ).property( "Size" ).setValueAtTime(word.startTime / 1000,[50,50]);
              //shapeLayer3.content( "Group 1" ).property( "Contents" ).property( "Ellipse Path 1" ).property( "Size" ).setValueAtTime((word.endTime / 1000),[10,10]);
                }
            }

         
    
    }
}

    lyricRecorderAE.createComposition( AUDIO_LOCATION, LYRIC_LOCATION );
    app.endUndoGroup();
}

