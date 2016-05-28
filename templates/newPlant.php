    <!--
    *
    * newPlant.php
    *
    -->
    <script>
        $(document).ready(function($) {
            // sets textboxes for companion benefits to hidden unless companion checked
            $('input.benChecked').change(function(){
                if ($(this).is(':checked')){
                    // the next.next is kinda sloppy, jumps over the <br> to get the textbox
                    $(this).next().next('.benTextIn').show();
                }
                else
                    $(this).next().next('.benTextIn').hide();
            }).change();
            // sets start info to hidden unless selected
            $('input.startChecked').change(function(){
                if ($(this).is(':checked')){
                    // the next.next is kinda sloppy, jumps over the break to get the textbox
                    $(this).next().next().show();
                }
                else
                    $(this).next().next().hide();
            }).change();
            $(function () {
        	$("[data-toggle='tooltip']").tooltip();
    	    });
        });
    </script>
    
    <div class="content contianer-fluid">
        <div class="col-sm-3 hidden-xs">
        </div>
        <div class="col-sm-6">
            <form action="plantToDB.php" method="post">
                <fieldset>
                    <label for="nameSelect">Name of Plant
                    </label>
                    <div id="nameSelect" class="form-group">
                        
                        <input autofocus required class="form-control" name="name" placeholder="Plant Name" type="text"/>
                    </div>
                    <label for="imgSelect">Image URL
                    </label>
                    <div id="imgSelect" class="form-group">
                        <input class="form-control" name="imgSrc" placeholder="Image Source" type="text"/>
                    </div>
                    <label for="spacingSelect">Spacing
                    </label>
                    <div id="spacingSelect" class="form-group">                      
                        <input  required class="" name="spacingStandard" placeholder="Standard" type="number" min="1"/>inches
                        <br>               
                        <input  required class="" name="spacingMetric" placeholder="Metric" type="number" min="1"/>centimeters
                    </div>                                        
                    <div id="startSelect" class="form-group" data-toggle="tooltip" data-placement="top" title="Relative to last frost. Negative number for days before last frost date, positive number counts days after last frost.">
                        <label for="startSelect" >Planting Dates
                        </label>
                        <br>
                        <input type="checkbox" class="startChecked"/>Start Indoors<br>
                        <div>
                        <input class="" name="inNumber" type="number" value="null"/> days -before/+after last frost date
                        </div>
                        <input type="checkbox" class="startChecked"/>Start Outdoors<br>
                        <div>
                        <input class="" name="outNumber" type="number" value="null"/> days -before/+after last frost date
                        </div>
                        <input type="checkbox" class="startChecked"/>Fall Harvest<br>
                        <div>
                        <input class="" name="fallNumber" type="number" value="null"/>days -before/+after first frost date   
                        </div>
                    </div>
                    <label for="daycountSelect">Daycount</label>
                    <div  id="daycountSelect" class="form-group" data-toggle="tooltip" data-placement="top" title="Days until first harvest">                        
                        <input id="inputDaycount" class="" name="daycount" type="number" min="0" required> days
                        </input>
                    </div>
                    <label for="waterSelect">Water</label>
                    <div  id="waterSelect" class="form-group">                       
                        <input id="metricWater" class="" name="metricWater" type="number" min="0" required>cm per week
                        </input>
                        <input id="standardWater" class="" name="standardWater" type="number" min="0" required>inches per week
                        </input>
                    </div>
                    <div id="sunSelect" class="form-group">
                        <label for="inputSun">Direct Sunlight</label>
                        <select id="inputSun" required class="form-control" name="sun" required/>
                            <option value="Full Sun">Full Sun (10+ hours)</option>
                            <option value="Light Shade">Light Shade (5 - 10 hours)</option>
                            <option value="Partial Shade">Partial Shade (2 - 5 hours)</option>
                            <option value="Full Shade">Full Shade (Only indirect sunlight)</option>
                        </select>
                    </div>
                    <div id="soilSelect" class="form-group">
                        <label for="inputSoil">Soil Type</label>
                        <select id="inputSoil" class="form-control" name="soil" required>
                            <option value="Clay">Clay</option>
                            <option value="Sandy">Sandy</option>
                            <option value="Silty">Silty</option>
                            <option value="Peaty">Peaty</option>
                            <option value="Chalky">Chalky</option>
                            <option value="Loamy">Loamy</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="hardiSelect">Cultivable Hardiness Zones</label>
                        <div id="hardiSelect" class="" >
                            <label class="checkbox-inline" style="margin-left: 10px">
                            	<input type="checkbox" name="H1" value="1" />Hardizone 1&#160;&#160;
                            </label>
                            <label class="checkbox-inline">
                            	<input type="checkbox" name="H2" value="1"/>Hardizone 2&#160;
			    </label>
			    <label class="checkbox-inline">
                            	<input type="checkbox" name="H3" value="1"/>Hardizone 3&#160;
			    </label>
			    <label class="checkbox-inline">
                            	<input type="checkbox" name="H4" value="1"/>Hardizone 4&#160;
			    </label>
			    <label class="checkbox-inline">
                            	<input type="checkbox" name="H5" value="1"/>Hardizone 5&#160;
			    </label>
			    <label class="checkbox-inline">
                            	<input type="checkbox" name="H6" value="1"/>Hardizone 6&#160;
			    </label>
			    <label class="checkbox-inline">
                            	<input type="checkbox" name="H7" value="1"/>Hardizone 7&#160;&#160;
			    </label>
			    <label class="checkbox-inline">
                            	<input type="checkbox" name="H8" value="1"/>Hardizone 8
                            </label>  
			    <label class="checkbox-inline">
                            	<input type="checkbox" name="H9" value="1"/>Hardizone 9&#160; 
                            </label>
                            <label class="checkbox-inline">
                            	<input type="checkbox" name="H10" value="1"/>Hardizone 10 
                            </label> 
                            <label class="checkbox-inline">
                            	<input type="checkbox" name="H11" value="1"/>Hardizone 11 
                            </label>
                            <label class="checkbox-inline">
                            	<input type="checkbox" name="H12" value="1"/>Hardizone 12  
                            </label>
			    <label class="checkbox-inline">
                            	<input type="checkbox" name="H13" value="1"/>Hardizone 13<br>  
                            </label>
                        </div>
                        
                    </div>    
                    <div id="companionsSelect" class="form-group">
                        <label for="companions">Companion Plants</label>
                        <div id="companions" class="">
                            <?php if (isset($companions)): $nameCount = -1;?>                       
                                <?php foreach ($companions as $companion): 
                                    $nameCount++;  ?>    
                                    <input class="benChecked" type="checkbox" name="<?= 'companions['. $nameCount . '][id]'?>" value="<?= htmlspecialchars($companion['id']) ?>"/><?= htmlspecialchars($companion["name"]) ?><br>
                               
                                    <div class="benTextIn">
                                        <textarea class="form-control"  name="<?= 'companions[' . $nameCount .'][benefits]'?>" rows="3" placeholder="How do these plants help each other?"></textarea>
                                    </div>
                                <?php endforeach ?>
                            <?php else: ?>
                                <h4>No Companions</h4>
                            <?php endif ?>
                    	</div>
                    </div>
                    <div id="notesInput" class="form-group">
                        <label for="notes">Notes</label>
                        <textarea id="notes" class="form-control" name="notes" rows="8" placeholder="Anything else you would like to add?"></textarea>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-default">Add To Database</button>
                    </div>       
                </fieldset>
            </form>
        </div>
        <div class="col-sm-3 hidden-xs">
        </div>
    </div>