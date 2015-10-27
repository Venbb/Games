package com.paypal.android.pizza;

import java.util.Vector;

import com.android.gservicesampletest.R;

import android.content.Context;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.ToggleButton;

public class CustomizePage extends BasePage implements OnClickListener {
	
	//The different elements of our page
	NavBar mainNavBar;
	Button continueButton;
	ToggleButton smallButton;
	ToggleButton mediumButton;
	ToggleButton largeButton;
	CheckBox extraCheeseCheckBox;
	CheckBox pepperoniCheckBox;
	CheckBox mushroomsCheckBox;
	CheckBox onionsCheckBox;
	LinearLayout insideLayout;
	
	//The IDs for the different pizza sizes
	public static final int ID_SMALL = 1000;
	public static final int ID_MEDIUM = 1001;
	public static final int ID_LARGE = 1002;

	public CustomizePage(Context context) {
		super(context);

		//Setup our page and remember our previous selections
		insideLayout = new LinearLayout(context);
		insideLayout.setLayoutParams(new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT));
		insideLayout.setOrientation(LinearLayout.VERTICAL);
		insideLayout.setBackgroundResource(R.drawable.bg);
		addView(insideLayout);
		
		mainNavBar = new NavBar(context, this);
		mainNavBar.titleText.setText("Customize your pizza");
		mainNavBar.leftButton.setText("Home");
		mainNavBar.rightButton.setText("");
		mainNavBar.rightButton.setVisibility(INVISIBLE);
		insideLayout.addView(mainNavBar);
		
		RelativeLayout sizeTitleLayout = new RelativeLayout(context);
		sizeTitleLayout.setLayoutParams(new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT));
		insideLayout.addView(sizeTitleLayout);
		
		TextView sizeTitle = new TextView(context);
		sizeTitle.setText("Select a size");
		sizeTitle.setTextColor(0xffffffff);
		sizeTitle.setPadding(0, 10, 0, 5);
		sizeTitle.setTextSize(16.0f);
		RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
		params.addRule(RelativeLayout.CENTER_HORIZONTAL, RelativeLayout.TRUE);
		sizeTitle.setLayoutParams(params);
		sizeTitleLayout.addView(sizeTitle);
		
		LinearLayout sizeLayout = new LinearLayout(context);
		sizeLayout.setLayoutParams(new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT));
		insideLayout.addView(sizeLayout);
		
		smallButton = new ToggleButton(context);
		smallButton.setText("Small ($5.99)");
		smallButton.setTextOn("Small ($5.99)");
		smallButton.setTextOff("Small ($5.99)");
		smallButton.setLayoutParams(new LinearLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT, 0.66f));
		smallButton.setOnClickListener(this);
		if (Pizza.getInstance().getCurrentSize() == Pizza.SIZE_SMALL)
			smallButton.setChecked(true);
		sizeLayout.addView(smallButton);
		
		mediumButton = new ToggleButton(context);
		mediumButton.setText("Medium ($7.99)");
		mediumButton.setTextOn("Medium ($7.99)");
		mediumButton.setTextOff("Medium ($7.99)");
		mediumButton.setLayoutParams(new LinearLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT, 0.66f));
		mediumButton.setOnClickListener(this);
		if (Pizza.getInstance().getCurrentSize() == Pizza.SIZE_MEDIUM)
			mediumButton.setChecked(true);
		sizeLayout.addView(mediumButton);
		
		largeButton = new ToggleButton(context);
		largeButton.setText("Large ($9.99)");
		largeButton.setTextOn("Large ($9.99)");
		largeButton.setTextOff("Large ($9.99)");
		largeButton.setLayoutParams(new LinearLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT, 0.66f));
		largeButton.setOnClickListener(this);
		if (Pizza.getInstance().getCurrentSize() == Pizza.SIZE_LARGE)
			largeButton.setChecked(true);
		sizeLayout.addView(largeButton);
		
		RelativeLayout toppingTitleLayout = new RelativeLayout(context);
		toppingTitleLayout.setLayoutParams(new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT));
		insideLayout.addView(toppingTitleLayout);
		
		TextView toppingTitle = new TextView(context);
		toppingTitle.setText("Choose your toppings ($1 each)");
		toppingTitle.setTextColor(0xffffffff);
		toppingTitle.setPadding(0, 10, 0, 5);
		toppingTitle.setTextSize(16.0f);
		params = new RelativeLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
		params.addRule(RelativeLayout.CENTER_HORIZONTAL, RelativeLayout.TRUE);
		toppingTitle.setLayoutParams(params);
		toppingTitleLayout.addView(toppingTitle);
		
		boolean cheese = false;
		boolean pepperoni = false;
		boolean mushrooms = false;
		boolean onions = false;
		
		Vector<Integer> toppings = Pizza.getInstance().getCurrentToppings();
		if (toppings.contains(new Integer(Pizza.TOPPING_EXTRA_CHEESE)))
			cheese = true;
		if (toppings.contains(new Integer(Pizza.TOPPING_PEPPERONI)))
			pepperoni = true;
		if (toppings.contains(new Integer(Pizza.TOPPING_MUSHROOMS)))
			mushrooms = true;
		if (toppings.contains(new Integer(Pizza.TOPPING_ONIONS)))
			onions = true;		
		
		LinearLayout cheeseLayout = new LinearLayout(context);
		cheeseLayout.setPadding(75, 0, 0, 0);
		insideLayout.addView(cheeseLayout);
		extraCheeseCheckBox = new CheckBox(context);
		extraCheeseCheckBox.setText("Extra Cheese");
		extraCheeseCheckBox.setPadding(50, 0, 0, 0);
		extraCheeseCheckBox.setChecked(cheese);
		cheeseLayout.addView(extraCheeseCheckBox);
		
		LinearLayout pepperoniLayout = new LinearLayout(context);
		pepperoniLayout.setPadding(75, 0, 0, 0);
		insideLayout.addView(pepperoniLayout);
		pepperoniCheckBox = new CheckBox(context);
		pepperoniCheckBox.setText("Pepperoni");
		pepperoniCheckBox.setPadding(50, 0, 0, 0);
		pepperoniCheckBox.setChecked(pepperoni);
		pepperoniLayout.addView(pepperoniCheckBox);
		
		LinearLayout mushroomsLayout = new LinearLayout(context);
		mushroomsLayout.setPadding(75, 0, 0, 0);
		insideLayout.addView(mushroomsLayout);
		mushroomsCheckBox = new CheckBox(context);
		mushroomsCheckBox.setText("Mushrooms");
		mushroomsCheckBox.setPadding(50, 0, 0, 0);
		mushroomsCheckBox.setChecked(mushrooms);
		mushroomsLayout.addView(mushroomsCheckBox);
		
		LinearLayout onionsLayout = new LinearLayout(context);
		onionsLayout.setPadding(75, 0, 0, 0);
		insideLayout.addView(onionsLayout);
		onionsCheckBox = new CheckBox(context);
		onionsCheckBox.setText("Onions");
		onionsCheckBox.setPadding(50, 0, 0, 0);
		onionsCheckBox.setChecked(onions);
		onionsLayout.addView(onionsCheckBox);
		
		RelativeLayout buttonLayout = new RelativeLayout(context);
		buttonLayout.setLayoutParams(new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT));
		insideLayout.addView(buttonLayout);
		
		continueButton = new Button(context);
		params = new RelativeLayout.LayoutParams(200, LayoutParams.WRAP_CONTENT);
		params.addRule(RelativeLayout.CENTER_HORIZONTAL, RelativeLayout.TRUE);
		continueButton.setLayoutParams(params);
		continueButton.setText("Continue");
		continueButton.setOnClickListener(this);
		buttonLayout.addView(continueButton);
	}

	@Override
	public void onClick(View v) {
		if (v == mainNavBar.leftButton) {
			//User is navigating back to the home page, so save our values and change the page
			saveValues();
			Pizza.getInstance().changePage(Pizza.PAGE_HOME);
		}
		else if (v == continueButton) {
			//User selected continue, so save our values and change the page
			saveValues();
			Pizza.getInstance().changePage(Pizza.PAGE_FINALIZE);
		}
		else if (v == smallButton) {
			//Deselect the other sizes to make these buttons more like a radio button
			mediumButton.setChecked(false);
			largeButton.setChecked(false);
		}
		else if (v == mediumButton) {
			//Deselect the other sizes to make these buttons more like a radio button
			smallButton.setChecked(false);
			largeButton.setChecked(false);
		}
		else if (v == largeButton) {
			//Deselect the other sizes to make these buttons more like a radio button
			smallButton.setChecked(false);
			mediumButton.setChecked(false);
		}
	}
	
	public void saveValues() {
		//Save our selections
		Vector<Integer> toppings = new Vector<Integer>();
		if (extraCheeseCheckBox.isChecked())
			toppings.add(new Integer(Pizza.TOPPING_EXTRA_CHEESE));
		if (pepperoniCheckBox.isChecked())
			toppings.add(new Integer(Pizza.TOPPING_PEPPERONI));
		if (mushroomsCheckBox.isChecked())
			toppings.add(new Integer(Pizza.TOPPING_MUSHROOMS));
		if (onionsCheckBox.isChecked())
			toppings.add(new Integer(Pizza.TOPPING_ONIONS));
		Pizza.getInstance().setCurrentToppings(toppings);
		
		int size = Pizza.SIZE_SMALL;
		if (mediumButton.isChecked())
			size = Pizza.SIZE_MEDIUM;
		else if (largeButton.isChecked())
			size = Pizza.SIZE_LARGE;
		Pizza.getInstance().setCurrentSize(size);
	}

	@Override
	public void update() {
		//Not used for this page
	}

}
