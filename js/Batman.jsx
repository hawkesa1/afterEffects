// Created using compCode v2.0  
// 20180519 from composition "Galutinis" in project "~/Downloads/Batman.aep"  
//  
// aescripts.com/compCode  
  
  
compCode_20180519_132802();  
  
  
function compCode_20180519_132802() {  
  
  
    app.beginUndoGroup("Galutinis");  
  
  
    try {  
  
  
        // CREATE FOLDER HIERARCHY START  
        var solids_folder_properties = {  
            "name": "Solids",  
            "typeName": "Folder",  
            "label": 2,  
            "comment": ""  
        };  
        var solids_folder = findProjectItem(app.project.rootFolder, false, solids_folder_properties);  
        if (solids_folder === null) {  
            solids_folder = app.project.items.addFolder(solids_folder_properties.name);  
            solids_folder.label = solids_folder_properties.label;  
        }  
        // CREATE FOLDER HIERARCHY END  
  
  
        // CREATE COMPOSITIONS START  
        var galutinis_comp_properties = {  
            "name": "Galutinis",  
            "typeName": "Composition",  
            "label": 15,  
            "comment": "",  
            "height": 1080,  
            "width": 1920,  
            "pixelAspect": 1,  
            "bgColor": [0, 0, 0],  
            "duration": 10,  
            "numLayers": 4,  
            "frameRate": 25  
        };  
        var galutinis_comp = app.project.items.addComp(galutinis_comp_properties.name, galutinis_comp_properties.width, galutinis_comp_properties.height, 1, 10, 25);  
        galutinis_comp.time = 7.32;  
        galutinis_comp.bgColor = galutinis_comp_properties.bgColor;  
        galutinis_comp.shutterPhase = -90;  
        galutinis_comp.label = galutinis_comp_properties.label;  
        galutinis_comp.workAreaDuration = 8.92;  
        galutinis_comp.resolutionFactor = [1, 1];  
        // CREATE COMPOSITIONS END  
  
  
        // CREATE NULL LAYERS START  
        var null2_null_properties = {  
            "name": "Null 2",  
            "typeName": "Footage",  
            "comment": "",  
            "label": 1,  
            "height": 100,  
            "width": 100,  
            "mainSource": {  
                "color": [1, 1, 1]  
            }  
        };  
        var null2_null = findProjectItem(solids_folder, false, null2_null_properties);  
        if (null2_null === null) {  
            var null2_tempNull = galutinis_comp.layers.addNull();  
            null2_null = null2_tempNull.source;  
            null2_null.name = null2_null_properties.name;  
            null2_null.label = null2_null_properties.label;  
            null2_null.mainSource.color = null2_null_properties.mainSource.color;  
            null2_null.parentFolder = solids_folder;  
            null2_tempNull.remove();  
        }  
        // CREATE NULL LAYERS END  
  
  
        // CREATE SOLID LAYERS START  
        var whiteSolid2_solid_properties = {  
            "name": "White Solid 2",  
            "typeName": "Footage",  
            "comment": "",  
            "label": 1,  
            "height": 1080,  
            "width": 1920,  
            "mainSource": {  
                "color": [1, 1, 1]  
            }  
        };  
        var whiteSolid2_solid = findProjectItem(solids_folder, false, whiteSolid2_solid_properties);  
        if (whiteSolid2_solid === null) {  
            var whiteSolid2_tempSolid = galutinis_comp.layers.addSolid([1, 1, 1], "White Solid 2", 1920, 1080, 1);  
            whiteSolid2_solid = whiteSolid2_tempSolid.source;  
            whiteSolid2_solid.label = whiteSolid2_solid_properties.label;  
            whiteSolid2_solid.parentFolder = solids_folder;  
            whiteSolid2_tempSolid.remove();  
        }  
        // CREATE SOLID LAYERS END  
  
  
        // Working with comp "Galutinis", varName "galutinis_comp";  
        galutinis_comp.openInViewer();  
        // Add existing Solid Layer "White Solid 2", varName "whiteSolid2_solid";  
        var controleris = galutinis_comp.layers.add(whiteSolid2_solid);  
        controleris.name = "Controleris";  
        controleris.enabled = false;  
        controleris.moveToEnd();  
        controleris.property("ADBE Effect Parade").addProperty("ADBE Slider Control");  
        controleris.property("ADBE Effect Parade").property(1).name = "Wiggle Kiekis";  
        controleris.property("ADBE Effect Parade").property(1).property("ADBE Slider Control-0001").setValue(5);  
        controleris.property("ADBE Effect Parade").addProperty("ADBE Slider Control");  
        controleris.property("ADBE Effect Parade").property(2).name = "Wiggle Greitis";  
        controleris.property("ADBE Effect Parade").property(2).property("ADBE Slider Control-0001").setValue(10);  
        controleris.property("ADBE Effect Parade").addProperty("ADBE Slider Control");  
        controleris.property("ADBE Effect Parade").property(3).name = "ScaleSlideris";  
        controleris.property("ADBE Effect Parade").property(3).property("ADBE Slider Control-0001").setValue(15);  
        controleris.property("ADBE Effect Parade").addProperty("ADBE Slider Control");  
        controleris.property("ADBE Effect Parade").property(4).name = "TextSlideris";  
        controleris.property("ADBE Effect Parade").property(4).property("ADBE Slider Control-0001").setValue(34);  
        controleris.selected = false;  
        //Create new Null layer "wiggle" and replace its source with varName "null2_null";  
        var wiggle = galutinis_comp.layers.addNull();  
        var wiggle_source = wiggle.source;  
        wiggle.replaceSource(null2_null, true);  
        wiggle_source.remove();  
        wiggle.name = "Wiggle";  
        wiggle.label = 1;  
        wiggle.enabled = false;  
        wiggle.moveToEnd();  
        wiggle.property("ADBE Transform Group").property("ADBE Anchor Point").setValue([0, 0, 0]);  
        wiggle.property("ADBE Transform Group").property("ADBE Position").setValue([909, 491, 0]);  
        wiggle.selected = false;  
        // Add Shape Layer "Batman", varName "batman";  
        var batman = galutinis_comp.layers.addShape();  
        batman.name = "Batman";  
        batman.label = 8;  
        batman.moveToEnd();  
        batman.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");  
        batman.property("ADBE Root Vectors Group").property(1).name = "Group 1";  
        batman.property("ADBE Root Vectors Group").property(1).property(2).addProperty("ADBE Vector Shape - Group");  
        batman.property("ADBE Root Vectors Group").property(1).property(2).property(1).name = "Path 1";  
        var batmanPath = batman.property("ADBE Root Vectors Group").property(1).property(2).property(1).property("ADBE Vector Shape");  
        var batmanPath_newShape = new Shape();  
        batmanPath_newShape.vertices = [  
            [384.121032714844, -104.252014160156],  
            [224.958923339844, -198.336975097656],  
            [203.789978027344, -139.533996582031],  
            [48.5490112304688, -103.468994140625],  
            [33.6530151367188, -166.976013183594],  
            [14.0530700683594, -126.989990234375],  
            [0, -123.851989746094],  
            [-14.052978515625, -126.989990234375],  
            [-33.6539916992188, -166.976013183594],  
            [-48.5499877929688, -103.468994140625],  
            [-203.790954589844, -139.533996582031],  
            [-224.9599609375, -198.336975097656],  
            [-384.121948242188, -104.252014160156],  
            [-495.061950683594, 70.1959838867188],  
            [-359.030944824219, -13.3040161132812],  
            [-290.819946289062, 52.5579986572266],  
            [-194.381958007812, 24.3300018310547],  
            [0, 198.336975097656],  
            [194.380920410156, 24.3300018310547],  
            [290.819030761719, 52.5579986572266],  
            [359.030944824219, -13.3040161132812],  
            [495.061950683594, 70.1959838867188]  
        ];  
        batmanPath_newShape.inTangents = [  
            [108.197998046875, 101.925048828125],  
            [0, 0],  
            [0, 0],  
            [0, 0],  
            [0, 0],  
            [0, 0],  
            [0, 0],  
            [0, 0],  
            [0, 0],  
            [0, 0],  
            [0, 0],  
            [0, 0],  
            [94.0859985351562, -78.4059448242188],  
            [0, 0],  
            [-72.1329956054688, 0],  
            [0, 0],  
            [-73.7020263671875, 0],  
            [0, 0],  
            [-186.598907470703, 0],  
            [0, 0],  
            [-61.93896484375, 0],  
            [0, 0]  
        ];  
        batmanPath_newShape.outTangents = [  
            [-94.0850830078125, -78.4059448242188],  
            [0, 0],  
            [0, 0],  
            [0, 0],  
            [0, 0],  
            [0, 0],  
            [0, 0],  
            [0, 0],  
            [0, 0],  
            [0, 0],  
            [0, 0],  
            [0, 0],  
            [-108.197998046875, 101.925048828125],  
            [0, 0],  
            [61.93798828125, 0],  
            [0, 0],  
            [186.598999023438, 0],  
            [0, 0],  
            [73.7020263671875, 0],  
            [0, 0],  
            [72.133056640625, 0],  
            [0, 0]  
        ];  
        batmanPath_newShape.closed = true;  
        batmanPath.setValue(batmanPath_newShape);  
        batman.property("ADBE Root Vectors Group").property(1).property(2).addProperty("ADBE Vector Graphic - Stroke");  
        batman.property("ADBE Root Vectors Group").property(1).property(2).property(2).name = "Stroke 1";  
        batman.property("ADBE Root Vectors Group").property(1).property(2).property(2).property("ADBE Vector Stroke Color").setValue([0, 0, 0, 1]);  
        batman.property("ADBE Root Vectors Group").property(1).property(2).property(2).property("ADBE Vector Stroke Width").setValue(1);  
        batman.property("ADBE Root Vectors Group").property(1).property(2).property(2).property("ADBE Vector Stroke Miter Limit").setValue(10);  
        batman.property("ADBE Root Vectors Group").property(1).property(2).addProperty("ADBE Vector Graphic - Fill");  
        batman.property("ADBE Root Vectors Group").property(1).property(2).property(3).name = "Fill 1";  
        batman.property("ADBE Root Vectors Group").property(1).property(2).property(3).property("ADBE Vector Fill Color").setValue([0, 0, 0, 1]);  
        batman.property("ADBE Root Vectors Group").property(1).property(3).property("ADBE Vector Position").setValue([960.000305175781, 540]);  
        batman.property("ADBE Effect Parade").addProperty("ADBE Fast Blur");  
        batman.property("ADBE Effect Parade").property(1).name = "Fast Blur (Legacy)";  
        batman.property("ADBE Effect Parade").property(1).property("ADBE Fast Blur-0001").setValue(0);  
        batman.property("ADBE Effect Parade").addProperty("ADBE Glo2");  
        batman.property("ADBE Effect Parade").property(2).name = "Glow";  
        batman.property("ADBE Effect Parade").property(2).property("ADBE Glo2-0003").setValue(10);  
        batman.property("ADBE Transform Group").property("ADBE Anchor Point").setValue([960, 540, 0]);  
        batman.property("ADBE Transform Group").property("ADBE Position").setValue([48.861065387247, 47.6755297280565, 0]);  
        batman.property("ADBE Transform Group").property("ADBE Scale").setValue([312.753104094378, 312.753104094378, 100]);  
        batman.selected = false;  
        // Add Shape Layer "Apskritimas ", varName "apskritimas";  
        var apskritimas = galutinis_comp.layers.addShape();  
        apskritimas.name = "Apskritimas ";  
        apskritimas.label = 8;  
        apskritimas.moveToEnd();  
        apskritimas.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");  
        apskritimas.property("ADBE Root Vectors Group").property(1).name = "Ellipse 1";  
        apskritimas.property("ADBE Root Vectors Group").property(1).property(2).addProperty("ADBE Vector Shape - Ellipse");  
        apskritimas.property("ADBE Root Vectors Group").property(1).property(2).property(1).name = "Ellipse Path 1";  
        apskritimas.property("ADBE Root Vectors Group").property(1).property(2).property(1).property("ADBE Vector Ellipse Size").setValue([1225.46875, 537.3125]);  
        apskritimas.property("ADBE Root Vectors Group").property(1).property(2).addProperty("ADBE Vector Graphic - Stroke");  
        apskritimas.property("ADBE Root Vectors Group").property(1).property(2).property(2).name = "Stroke 1";  
        apskritimas.property("ADBE Root Vectors Group").property(1).property(2).property(2).property("ADBE Vector Stroke Color").setValue([0.10321691176471, 0.10242001402612, 0.10242001402612, 1]);  
        apskritimas.property("ADBE Root Vectors Group").property(1).property(2).property(2).property("ADBE Vector Stroke Width").setValue(12);  
        apskritimas.property("ADBE Root Vectors Group").property(1).property(2).addProperty("ADBE Vector Graphic - Fill");  
        apskritimas.property("ADBE Root Vectors Group").property(1).property(2).property(3).name = "Fill 1";  
        apskritimas.property("ADBE Root Vectors Group").property(1).property(2).property(3).property("ADBE Vector Fill Color").setValue([0.97247242647059, 0.85436245787377, 0.13694758695715, 1]);  
        apskritimas.property("ADBE Root Vectors Group").property(1).property(3).property("ADBE Vector Position").setValue([108.734375, 24.65625]);  
        apskritimas.property("ADBE Effect Parade").addProperty("ADBE Fast Blur");  
        apskritimas.property("ADBE Effect Parade").property(1).name = "Fast Blur (Legacy)";  
        apskritimas.property("ADBE Effect Parade").property(1).property("ADBE Fast Blur-0001").setValue(0);  
        apskritimas.property("ADBE Transform Group").property("ADBE Position").setValue([838.321056547619, 512.408482142857, 0]);  
        apskritimas.property("ADBE Transform Group").property("ADBE Scale").setValue([111.904761904762, 111.904761904762, 100]);  
        apskritimas.selected = false;  
        // Apply parents  
        batman.setParentWithJump(wiggle);  
  
  
  
  
        // Remove empty Solids folder  
        var tempNullComp = app.project.items.addComp("tempNullComp", 100, 100, 1, 1, 24);  
        var tempNullLayer = tempNullComp.layers.addNull();  
        var nullFolder = tempNullLayer.source.parentFolder;  
        tempNullLayer.source.remove();  
        tempNullComp.remove();  
        if (nullFolder.numItems === 0)  
            nullFolder.remove();  
  
  
  
  
        // Apply expressions to properties  
        try {  
            controleris.property("ADBE Effect Parade").property(1).property("ADBE Slider Control-0001").expression = "clamp(value, 2, 20);";  
        } catch (err) {}  
        try {  
            controleris.property("ADBE Effect Parade").property(2).property("ADBE Slider Control-0001").expression = "clamp(value, 2, 20);";  
        } catch (err) {}  
        try {  
            controleris.property("ADBE Effect Parade").property(3).property("ADBE Slider Control-0001").expression = "clamp(value, 2, 20);";  
        } catch (err) {}  
        try {  
            controleris.property("ADBE Effect Parade").property(4).property("ADBE Slider Control-0001").expression = "clamp(value, 2, 30);";  
        } catch (err) {}  
        try {  
            wiggle.property("ADBE Transform Group").property("ADBE Anchor Point").expression = "wiggle(thisComp.layer(\"Controleris\").effect(\"Wiggle Greitis\")(\"Slider\"),thisComp.layer(\"Controleris\").effect(\"Wiggle Kiekis\")(\"Slider\"))" + "\n" +  
                "timeToStop = 6;" + "\n" +  
                "if(time<timeToStop) {" + "\n" +  
                "wiggle(thisComp.layer(\"Controleris\").effect(\"Wiggle Kiekis\")(\"Slider\"),thisComp.layer(\"Controleris\").effect(\"Wiggle Greitis\")(\"Slider\"))" + "\n" +  
                "} else {" + "\n" +  
                "wiggle(0,0);" + "\n" +  
                "};" + "\n" +  
                "";  
        } catch (err) {}  
        try {  
            batman.property("ADBE Effect Parade").property(1).property("ADBE Fast Blur-0001").expression = "600-time*2000";  
        } catch (err) {}  
        try {  
            batman.property("ADBE Effect Parade").property(2).property("ADBE Glo2-0003").expression = "timeToStart = 1;" + "\n" +  
                "if(time>timeToStart) {" + "\n" +  
                "value=82;" + "\n" +  
                "} else {" + "\n" +  
                "value=0;" + "\n" +  
                "};";  
        } catch (err) {}  
        try {  
            batman.property("ADBE Transform Group").property("ADBE Scale").expression = "var scaleSlideris = thisComp.layer(\"Controleris\").effect(\"ScaleSlideris\")(\"Slider\");" + "\n" +  
                "timeToStart = 6;" + "\n" +  
                "if(time>timeToStart){" + "\n" +  
                "   temp = 100;" + "\n" +  
                "} else {" + "\n" +  
                "   temp = 65+time*4;" + "\n" +  
                "}" + "\n" +  
                "" + "\n" +  
                "[temp+scaleSlideris, temp+scaleSlideris]";  
        } catch (err) {}  
        try {  
            apskritimas.property("ADBE Effect Parade").property(1).property("ADBE Fast Blur-0001").expression = "600-time*2000";  
        } catch (err) {}  
  
  
        galutinis_comp.openInViewer();  
  
  
        return {  
            compItem: galutinis_comp  
        };  
  
  
    } catch (e) {  
        alert(e.toString() + "\nScript File: " + File.decode(e.fileName).replace(/^.*[\|\/]/, '') +  
            "\nFunction: " + arguments.callee.name +  
            "\nError on Line: " + e.line.toString());  
    }  
    app.endUndoGroup();  
  
  
  
  
    function findProjectItem(searchFolder, recursion, userData) {  
        var folderItem;  
        for (var i = 1, il = searchFolder.items.length; i <= il; i++) {  
            folderItem = searchFolder.items[i];  
            if (propertiesMatch(folderItem, userData))  
                return folderItem;  
            else if (recursion === true && folderItem instanceof FolderItem && folderItem.numItems > 0) {  
                var item = findProjectItem(folderItem, recursion, userData);  
                if (item !== null) return item;  
            }  
        }  
        return null;  
    }  
  
  
    function propertiesMatch(projectItem, userData) {  
        if (typeof userData === "undefined") return true;  
  
  
        for (var propertyName in userData) {  
            if (!userData.hasOwnProperty(propertyName)) continue;  
  
  
            if (typeof userData[propertyName] !== typeof projectItem[propertyName])  
                return false;  
  
  
            if (isArray(userData[propertyName]) && isArray(projectItem[propertyName])) {  
                if (userData[propertyName].toString() !== projectItem[propertyName].toString()) {  
                    return false;  
                }  
            } else if (typeof userData[propertyName] === "object" && typeof projectItem[propertyName] === "object") {  
                if (!propertiesMatch(projectItem[propertyName], userData[propertyName])) {  
                    return false;  
                }  
            } else if (projectItem[propertyName] !== userData[propertyName]) {  
                return false;  
            }  
        }  
        return true;  
    }  
  
  
    function isArray(object) {  
        return Object.prototype.toString.apply(object) === "[object Array]";  
    }  
  
  
}  