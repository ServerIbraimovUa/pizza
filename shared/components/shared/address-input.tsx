import React, { useState } from "react";
import Autosuggest, { SuggestionsFetchRequestedParams } from "react-autosuggest";

// Типизация для города
type City = {
    name: string;
    streets: string[];
};

// Пример списка городов с улицами для Киева
const cities: City[] = [
    {
        name: "Киев",
        streets: [
            "Крещатик",
            "Бульвар Тараса Шевченко",
            "Владимирская",
            "Богдана Хмельницкого",
            "Михайловская",
            "Сагайдачного",
            "Андреевский спуск",
            "Львовская площадь",
            "Оболонская набережная",
            "Труханов остров",
        ],
    },
];

const CityAutoSuggest: React.FC = () => {
    const [value, setValue] = useState<string>("");
    const [suggestions, setSuggestions] = useState<City[]>([]);

    const getSuggestions = (inputValue: string): City[] => {
        const lowercasedInput = inputValue.trim().toLowerCase();
        return lowercasedInput.length === 0
            ? []
            : cities.filter((city) => city.name.toLowerCase().startsWith(lowercasedInput));
    };

    const onSuggestionsFetchRequested = ({ value }: SuggestionsFetchRequestedParams) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const getSuggestionValue = (suggestion: City): string => suggestion.name;

    const renderSuggestion = (suggestion: City) => (
        <div>
            {suggestion.name}
            <ul>
                {suggestion.streets.map((street, index) => (
                    <li key={index}>{street}</li>
                ))}
            </ul>
        </div>
    );

    return (
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
                placeholder: "Введите город",
                value,
                onChange: (_, { newValue }: { newValue: string }) => setValue(newValue),
            }}
            // theme={{
            //     suggestionsContainer: "w-full rounded-lg shadow-lg",
            //     suggestionHighlighted: "w-full rounded-lg shadow-lg",
            // }}
        />
    );
};

export default CityAutoSuggest;
