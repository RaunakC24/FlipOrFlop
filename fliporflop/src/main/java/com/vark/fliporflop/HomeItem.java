package com.vark.fliporflop;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HomeItem {
    public String price;
    public String address;
    public String beds;
    public String baths;
    public String squareFeet;
    public String description;
    public String imageUrl;
}
