{
    #include "json2.js" // jshint ignore:line    
    #include "lyricRecorderLineStyle1.jsx" // jshint ignore:line    
    #include "lyricRecorderLineStyle2.jsx" // jshint ignore:line   
    #include "lyricRecorderLineStyleUtilities.jsx" // jshint ignore:line  
    //   #include ".\\rd_scripts\\rd_GimmeProps.jsx"
    //#include ".\\rd_scripts\\rd_GimmePropPath.jsx"
  //  #include ".\\rd_scripts\\rd_GimmePropInfo.jsx"
    //  #include ".\\rd_scripts\\rd_ShapesToMasks.jsx"

    // #include ".\\rd_scripts\\rd_ShapesToMasks.jsx"

    //#include ".\\rd_scripts\\rd_ExprTweaker.jsx"


    var AUDIO_LOCATION = "H:\\Development\\2018\\AfterEffects\\afterEffects\\afterEffectsProject\\resources\\LyricRecorder\\audio\\audio.mp3";
    var LYRIC_LOCATION = "H:\\Development\\2018\\AfterEffects\\afterEffects\\afterEffectsProject\\resources\\LyricRecorder\\lyricData\\LyricRecorder.js";
    var EXPRESSION_SCRIPT = "H:\\Development\\2018\\AfterEffects\\afterEffects\\afterEffectsProject\\js\\expression1.jsx"

    var COMP_NAME = "MusicVideo";
    var COMP_WIDTH = 1920;
    var COMP_HEIGHT = 1080;
    var COMP_PIXEL_ASPECT = 1;
    var COMP_DURATION = 15; //Test Value
    var COMP_FRAME_RATE = 60;

    app.beginUndoGroup( "Create Music Video" );

    var lyricRecorderAE = {

        createComposition: function( audioFileLocation, lyricsFileLocation ) {
            var lyricJsonObject = lyricRecorderAE.readLyricDataFromFile( lyricsFileLocation );
            var lines = lyricJsonObject.lyricRecorderSynchronisedLyrics;
            var coordinatesString = lyricJsonObject.coordinates;
            var coordinatesArray = coordinatesString.split( '|' );

            // Creating a Project
            var currentProject = app.newProject();

            var mp3File = currentProject.importFile( new ImportOptions( File( audioFileLocation ) ) );

            // Creating comp

            //var compDuration=mp3File.duration;
            var compDuration = COMP_DURATION;
            var currentComp = currentProject.items.addComp( COMP_NAME, COMP_WIDTH, COMP_HEIGHT, COMP_PIXEL_ASPECT, compDuration, COMP_FRAME_RATE );
            currentComp.openInViewer();
            currentComp.layers.add( mp3File );

            var camera = currentComp.layers.addCamera( "alexCamera1", [currentComp.width / 2, currentComp.height / 2] );
            //  var light = currentComp.layers.addLight( "alexLight1", [currentComp.width / 2, currentComp.height / 2] );
            // light.castsShadows.setValue( 1 );

            //Add a background
            var backgroundLayer = currentComp.layers.addSolid( lyricRecorderLineStyleUtilities.hexToColor( "000000" ), "Background", COMP_WIDTH, COMP_HEIGHT, COMP_PIXEL_ASPECT );
            backgroundLayer.threeDLayer = true;

            lyricRecorderAE.drawWaveForm( currentComp, coordinatesArray );

            lyricRecorderAE.handleLines( lines, currentComp, camera );


            app.executeCommand( app.findMenuCommandId( "Convert Audio to Keyframes" ) );
        },

        readLyricDataFromFile: function( lyricsFile ) {
            var scriptFile = File( lyricsFile );
            scriptFile.open( 'r' );
            var content = scriptFile.read();
            my_JSON_object = JSON.parse( content );// now evaluate the string from the file
            scriptFile.close();
            return my_JSON_object;
        },
        drawWaveForm: function( currentComp, coordinatesArray ) {

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
            for ( var i = 0; i < coordinatesArray.length; i++ ) {
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
                //myArray += "Hello Alex" + i;
                myArray += "coordinates=coordinates.concat(coordinates_" + next + ");\n";
                myArray1 += "coordinates=coordinates.concat(coordinates_" + next + ");\n";
            }
            alexScript1 = myArray + "\n" + alexScript;
            alexScript2 = myArray1 + "\n" + alexScript;
            batman = currentComp.layers.addShape();
            batman.name = "Batman";
            batman.property( "ADBE Root Vectors Group" ).addProperty( "ADBE Vector Group" );
            batman.property( "ADBE Root Vectors Group" ).property( 1 ).name = "Group 1";
            batman.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).addProperty( "ADBE Vector Shape - Group" );
            batman.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).addProperty( "ADBE Vector Graphic - Stroke" );
            batman.content("Group 1").content("Stroke 1").color.setValue(lyricRecorderLineStyleUtilities.hexToColor( "14B820" ));
            batman.content("Group 1").content("Stroke 1").strokeWidth.setValue(6);
            batman.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).property( 1 ).name = "Path 1";
            batmanPath = batman.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).property( 1 ).property( "ADBE Vector Shape" );
            batmanPath_newShape = new Shape();
            batmanPath_newShape.closed = false;
            batmanPath.setValue( batmanPath_newShape );
            batman.property( "Contents" ).property( "Group 1" ).property( "Contents" ).property( "Path 1" ).property( "Path" ).expression = alexScript1;

            batman1 = currentComp.layers.addShape();
            batman1.name = "Batman1";
            batman1.property( "ADBE Root Vectors Group" ).addProperty( "ADBE Vector Group" );
            batman1.property( "ADBE Root Vectors Group" ).property( 1 ).name = "Group 1";
            batman1.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).addProperty( "ADBE Vector Shape - Group" );
            batman1.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).addProperty( "ADBE Vector Graphic - Stroke" );
            batman1.content("Group 1").content("Stroke 1").color.setValue(lyricRecorderLineStyleUtilities.hexToColor( "14B820" ));
            batman1.content("Group 1").content("Stroke 1").strokeWidth.setValue(6);
            batman1.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).property( 1 ).name = "Path 1";
            batmanPath1 = batman1.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).property( 1 ).property( "ADBE Vector Shape" );
            batmanPath_newShape1 = new Shape();
            batmanPath_newShape1.closed = false;
            batmanPath1.setValue( batmanPath_newShape1 );
            batman1.property( "Contents" ).property( "Group 1" ).property( "Contents" ).property( "Path 1" ).property( "Path" ).expression = alexScript2;


            batman2 = currentComp.layers.addShape();
            batman2.name = "Batman2";
            batman2.property( "ADBE Root Vectors Group" ).addProperty( "ADBE Vector Group" );
            batman2.property( "ADBE Root Vectors Group" ).property( 1 ).name = "Group 1";
            batman2.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).addProperty( "ADBE Vector Shape - Group" );
            batman2.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).addProperty( "ADBE Vector Graphic - Stroke" );
            batman2.content("Group 1").content("Stroke 1").color.setValue(lyricRecorderLineStyleUtilities.hexToColor( "14B820" ));
            batman2.content("Group 1").content("Stroke 1").strokeWidth.setValue(6);
            batman2.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).property( 1 ).name = "Path 1";
            batmanPath2 = batman2.property( "ADBE Root Vectors Group" ).property( 1 ).property( 2 ).property( 1 ).property( "ADBE Vector Shape" );
            batmanPath_newShape2 = new Shape();
            batmanPath_newShape2.vertices = [[-700,-500],[-700,-100]];
            batmanPath_newShape2.inTangents=[[0,0],[0,0]];
            batmanPath_newShape2.outTangents=[[0,0],[0,0]];
            batmanPath_newShape2.closed = false;
            batmanPath2.setValue( batmanPath_newShape2 );

           

            // batman.startTime =coo[0]/100;
            //   batman.outPoint = (coo[0]/100)+.1;

        },


        handleLines: function( lines, currentComp, camera, light ) {
            // for(var i=0; i<lines.length; i++)
            for ( var i = 0; i < 2; i++ ) {
                var line;
                line = lines[i];
                lyricRecorderLineStyle2.drawLine( currentComp, line, i, camera, light );

                //set the timings for Animator 1
                for ( var j = 0; j < line.words.length; j++ ) {
                    word = line.words[j];
                    //   var animationStart = word.afterEffectsTextLayer.property( "Text" ).property( "Animators" ).property( "Animator 1" ).property( "Selectors" ).property( "Range Selector 1" ).property( "Start" );
                    // for ( var k = animationStart.numKeys; k > 0; k-- ) {
                    //    animationStart.removeKey( k );
                    //   }

                    word.afterEffectsTextLayer.startTime = line.startTime / 1000;
                    word.afterEffectsTextLayer.outPoint = line.endTime / 1000;

                    word.afterEffectsTextLayer1.startTime = line.startTime / 1000;
                    word.afterEffectsTextLayer1.outPoint = line.endTime / 1000;

                    //  animationStart.setValueAtTime(( line.startTime / 1000 ), 50 );
                    //  animationStart.setValueAtTime(( word.startTime / 1000 ), 50);
                    //    animationStart.setValueAtTime(( word.endTime / 1000 ), 100 );




                    lyricRecorderLineStyleUtilities.setFont1( word.afterEffectsTextLayer1 );

                    var newMask = word.afterEffectsTextLayer1.Masks.addProperty( "Mask" );
                    //newMask.inverted = true;
                    var myMaskShape = newMask.property( "maskShape" );
                    var myShape = myMaskShape.value;
                    myShape.vertices = [[0, 0], [0, 0 - word.wordHeight], [0 + word.wordWidth, 0 - word.wordHeight], [0 + word.wordWidth, 0]];

                    var myShape1 = myMaskShape.value;
                    myShape1.vertices = [[0, 0], [0, 0 - word.wordHeight], [0, 0 - word.wordHeight], [0, 0]];

                    myShape.closed = false;
                    //  myMaskShape.setValue(myShape);               
                    myMaskShape.setValueAtTime( word.startTime / 1000, myShape1 );
                    myMaskShape.setValueAtTime( word.endTime / 1000, myShape );




                }

                // precompose the comp in to lines
                var indexesToPrecompose = [];
                for ( var m = currentComp.layers.length - ( i + 6); m > 0; m-- ) {
                    indexesToPrecompose.push( m );
                }
                var lineComp = currentComp.layers.precompose( indexesToPrecompose, "Line_" + i, true );
                lineComp.threeDLayer = true;
                //   lineComp.openInViewer();
            }

            // Make all layers 3d
            for ( var i = 1; i < currentComp.layers.length; i++ ) {
                currentComp.layers[i].threeDLayer = true;

            }



        }


    }

    lyricRecorderAE.createComposition( AUDIO_LOCATION, LYRIC_LOCATION );
    app.endUndoGroup();
}

