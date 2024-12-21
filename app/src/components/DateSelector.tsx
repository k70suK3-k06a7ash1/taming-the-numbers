"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function DateSelector() {
  const [date, setDate] = useState(new Date());

  const incrementMonth = () => {
    setDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const decrementMonth = () => {
    setDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  return (
    <Card className="mb-6">
      <CardContent className=" flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={decrementMonth}
          aria-label="前月"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <h2 className="text-xl font-medium">
          {date.getFullYear()}年{date.getMonth() + 1}月
        </h2>

        <Button
          variant="ghost"
          size="icon"
          onClick={incrementMonth}
          aria-label="次月"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
