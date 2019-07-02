{
    #include "json2.js" // jshint ignore:line    
    #include "lyricRecorderLineStyle1.jsx" // jshint ignore:line    
    #include "lyricRecorderLineStyle2.jsx" // jshint ignore:line   
    #include "lyricRecorderLineStyleUtilities.jsx" // jshint ignore:line  
    #include ".\\rd_scripts\\rd_GimmeProps.jsx"
     #include ".\\rd_scripts\\rd_GimmePropPath.jsx"
     #include ".\\rd_scripts\\rd_GimmePropInfo.jsx"

    var AUDIO_LOCATION="H:\\Development\\2018\\AfterEffects\\afterEffects\\afterEffectsProject\\resources\\LyricRecorder\\audio\\audio.mp3";
    var LYRIC_LOCATION="H:\\Development\\2018\\AfterEffects\\afterEffects\\afterEffectsProject\\resources\\LyricRecorder\\lyricData\\LyricRecorder.js";

    var COMP_NAME="MusicVideo";
    var COMP_WIDTH=1920;
    var COMP_HEIGHT=1080;
    var COMP_PIXEL_ASPECT=1;
    var COMP_DURATION=15; //Test Value
    var COMP_FRAME_RATE=30;

    app.beginUndoGroup( "Create Music Video" );
   
    var lyricRecorderAE = {

          createComposition: function( audioFileLocation, lyricsFileLocation ) {
            var lyricJsonObject = lyricRecorderAE.readLyricDataFromFile(lyricsFileLocation);
            var lines = lyricJsonObject.lyricRecorderSynchronisedLyrics;
        
            // Creating a Project
            var currentProject = app.newProject();
       
            var mp3File = currentProject.importFile( new ImportOptions( File( audioFileLocation ) ) );

            // Creating comp
           
            //var compDuration=mp3File.duration;
            var compDuration=COMP_DURATION;
            var currentComp = currentProject.items.addComp(COMP_NAME, COMP_WIDTH, COMP_HEIGHT, COMP_PIXEL_ASPECT, compDuration, COMP_FRAME_RATE);
            currentComp.openInViewer();
            currentComp.layers.add(mp3File);
            
            var camera = currentComp.layers.addCamera( "alexCamera1", [currentComp.width / 2, currentComp.height / 2] );
            var light = currentComp.layers.addLight( "alexLight1", [currentComp.width / 2, currentComp.height / 2] );
            light.castsShadows.setValue( 1 );

            //Add a background
            var backgroundLayer = currentComp.layers.addSolid( [0, 0, 0], "Background", COMP_WIDTH * 5, COMP_HEIGHT * 5, COMP_PIXEL_ASPECT );
            backgroundLayer.threeDLayer = true;
            lyricRecorderAE.handleLines( lines, currentComp, camera, light);
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
    
        handleLines: function( lines, currentComp, camera, light ) {
            // for(var i=0; i<lines.length; i++)
            for ( var i = 0; i < 3; i++ ) {
                var line;
                line = lines[i];
                lyricRecorderLineStyle2.drawLine( currentComp, line, i, camera, light );
            }
        
                        $.writeln( "1");    
                        var layers = currentComp.layers;                      
              
                        var layer;

                        for (var i = 1; i <= layers.length; i++)
                        {
                                layer = layers[i];        
                                   $.writeln(layer.name);  
                        }
                    
                      // lyricRecorderLineStyleUtilities.printPropertiesOfLayer(currentComp.layer("alexTextLayer_0_0_But"),"alexTextLayer_0_0_But")
                        //scanPropGroupProperties( app.project.activeItem.selectedLayers[0]);
                        //rd_GimmeProps(currentComp.layer("alexTextLayer_0_0_But"));
                         rd_GimmePropsPath(currentComp.layer("alexTextLayer_0_0_But"));
                       //   rd_GimmePropsInfo(currentComp.layer("alexTextLayer_0_0_But"));
                        $.writeln( "2"); 
        }
    }
 
   lyricRecorderAE.createComposition(AUDIO_LOCATION, LYRIC_LOCATION);
    app.endUndoGroup();
}




 //$.writeln( lines );
