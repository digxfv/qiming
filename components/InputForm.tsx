import React from 'react';
import { UserInput, GENDER_OPTIONS } from '../types';

interface InputFormProps {
  input: UserInput;
  setInput: React.Dispatch<React.SetStateAction<UserInput>>;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ input, setInput, onSubmit, isLoading }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm border-2 border-china-gold rounded-xl p-6 shadow-lg relative overflow-hidden transition-all duration-500">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <h2 className="text-xl font-serif font-bold text-china-red mb-6 flex items-center justify-center">
        <span className="w-8 h-[2px] bg-china-gold mr-3"></span>
        填写信息
        <span className="w-8 h-[2px] bg-china-gold ml-3"></span>
      </h2>

      <div className="space-y-5">
        
        {/* Surname & Gender Row */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">宝宝姓氏</label>
            <input
              type="text"
              value={input.surname}
              onChange={(e) => setInput({ ...input, surname: e.target.value })}
              placeholder="如：李"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-china-red focus:ring-1 focus:ring-china-red outline-none text-lg text-center"
              maxLength={2}
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">名字字数</label>
             <select
              value={input.wordCount}
              onChange={(e) => setInput({ ...input, wordCount: e.target.value as '1'|'2' })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-china-red focus:ring-1 focus:ring-china-red outline-none appearance-none bg-white text-center"
            >
              <option value="2">双字名</option>
              <option value="1">单字名</option>
            </select>
          </div>
        </div>

        {/* Gender Selection */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-3">宝宝性别</label>
          <div className="flex justify-between gap-2">
            {GENDER_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setInput({ ...input, gender: option.value })}
                className={`flex-1 py-2 rounded-lg border transition-all duration-300 ${
                  input.gender === option.value
                    ? 'bg-china-red text-white border-china-red shadow-md'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-china-gold'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bazi Option Toggle */}
        <div className="border-t border-dashed border-gray-200 pt-4">
            <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                    <input 
                        type="checkbox" 
                        checked={input.useBazi}
                        onChange={(e) => setInput({...input, useBazi: e.target.checked})}
                        className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-china-red"></div>
                </div>
                <span className={`text-sm font-bold ${input.useBazi ? 'text-china-red' : 'text-gray-500'}`}>
                    结合生辰八字 (推荐)
                </span>
            </label>
            
            {/* Bazi Inputs Expansion */}
            <div className={`grid transition-all duration-300 ease-in-out overflow-hidden ${input.useBazi ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="min-h-0 space-y-4 bg-red-50/50 p-4 rounded-lg border border-red-100">
                    <div>
                        <label className="block text-gray-700 text-xs font-bold mb-1">出生日期 (公历)</label>
                        <input
                            type="date"
                            value={input.birthDate}
                            onChange={(e) => setInput({ ...input, birthDate: e.target.value })}
                            className="w-full px-3 py-2 rounded border border-gray-300 focus:border-china-red outline-none text-sm bg-white"
                        />
                    </div>
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <label className="block text-gray-700 text-xs font-bold mb-1">出生时间</label>
                            <input
                                type="time"
                                value={input.birthTime}
                                onChange={(e) => setInput({ ...input, birthTime: e.target.value })}
                                className="w-full px-3 py-2 rounded border border-gray-300 focus:border-china-red outline-none text-sm bg-white"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 text-xs font-bold mb-1">出生城市</label>
                            <input
                                type="text"
                                placeholder="如: 北京"
                                value={input.birthPlace}
                                onChange={(e) => setInput({ ...input, birthPlace: e.target.value })}
                                className="w-full px-3 py-2 rounded border border-gray-300 focus:border-china-red outline-none text-sm bg-white"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Wishes */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            寄语与期望 <span className="text-gray-400 font-normal">(选填)</span>
          </label>
          <textarea
            value={input.wishes}
            onChange={(e) => setInput({ ...input, wishes: e.target.value })}
            placeholder="例如：希望宝宝平安健康，学识渊博，性格开朗..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-china-red focus:ring-1 focus:ring-china-red outline-none resize-none h-20 text-sm"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={onSubmit}
          disabled={isLoading || !input.surname}
          className={`w-full py-4 rounded-xl text-lg font-bold shadow-lg transform transition-transform active:scale-95 flex items-center justify-center gap-2 ${
            isLoading || !input.surname
              ? 'bg-gray-400 cursor-not-allowed text-white'
              : 'bg-gradient-to-r from-china-red to-deep-red text-china-gold hover:shadow-xl'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {input.useBazi ? '排盘起名中...' : '正在寻经据典...'}
            </>
          ) : (
            '赐 锦 绣 良 名'
          )}
        </button>
      </div>
    </div>
  );
};

export default InputForm;
